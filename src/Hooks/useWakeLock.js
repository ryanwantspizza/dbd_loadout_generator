import { useCallback, useEffect, useRef, useState } from "react";
import { webm, mp4 } from "./noSleepMedia";

const inBrowser = typeof navigator !== "undefined" && typeof document !== "undefined";

const hasNativeWakeLock = inBrowser && "wakeLock" in navigator;

// iOS/iPadOS — including iPadOS, which reports itself as "MacIntel".
const isIOS =
  inBrowser &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

// Third-party iOS browsers (Chrome = CriOS, Firefox = FxiOS, Edge = EdgiOS,
// Opera = OPiOS/OPT, Google app = GSA) run in a WebKit web view where the Wake
// Lock API is absent or ignored, so it can't hold the screen awake. Force the
// video fallback there. Safari itself keeps the reliable native lock, which
// also avoids the video's side effect of interrupting background audio.
const isIOSWebView = isIOS && /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|GSA/i.test(navigator.userAgent);

// Use the silent-video trick when there's no native lock at all, or on an iOS
// web-view browser where the native lock can't be trusted. Otherwise use the
// real Wake Lock API.
const useVideoFallback = inBrowser && (!hasNativeWakeLock || isIOSWebView);

// The feature is usable in any browser: native lock where available, otherwise
// a plain <video> element, which is universally supported.
const isSupported = inBrowser;

/**
 * Keeps the screen from dimming/locking while the page is open.
 *
 * Prefers the Screen Wake Lock API (desktop Chrome/Edge/Firefox, Android). On
 * iOS — where that API is missing or unreliable in every browser — it falls
 * back to playing a tiny silent looping video, which holds the display awake.
 * Browsers only start playback from a user gesture, so the lock is (re)acquired
 * on the next pointer/key event whenever an initial attempt is rejected, and it
 * is re-acquired when the tab becomes visible again.
 */
export function useWakeLock(enabled) {
  const sentinelRef = useRef(null); // native wake lock sentinel
  const videoRef = useRef(null); // fallback <video> element
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  // Build the fallback video lazily, once. It is deliberately left unmuted (the
  // clips are silent): iOS only treats *audible-capable* playback as a reason to
  // keep the screen on. It sits 1px and invisible but must not be display:none,
  // which would pause playback.
  const getVideo = useCallback(() => {
    if (videoRef.current) return videoRef.current;
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("title", "Keep screen awake");
    video.setAttribute("aria-hidden", "true");
    video.style.cssText =
      "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;";

    const addSource = (type, src) => {
      const source = document.createElement("source");
      source.src = src;
      source.type = `video/${type}`;
      video.appendChild(source);
    };
    addSource("webm", webm);
    addSource("mp4", mp4);

    // Loop the short webm outright; seek-loop the longer mp4 so it never ends.
    video.addEventListener("loadedmetadata", () => {
      if (video.duration <= 1) {
        video.setAttribute("loop", "");
      } else {
        video.addEventListener("timeupdate", () => {
          if (video.currentTime > 0.5) video.currentTime = Math.random();
        });
      }
    });

    document.body.appendChild(video);
    videoRef.current = video;
    return video;
  }, []);

  const release = useCallback(async () => {
    const sentinel = sentinelRef.current;
    sentinelRef.current = null;
    if (sentinel && !sentinel.released) {
      try {
        await sentinel.release();
      } catch {
        // The lock is gone either way.
      }
    }
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // Ignore — pausing a not-yet-played video can throw.
      }
    }
    setActive(false);
  }, []);

  const request = useCallback(async () => {
    if (document.visibilityState !== "visible") return;

    if (useVideoFallback) {
      const video = getVideo();
      if (!video.paused) {
        setActive(true);
        return;
      }
      try {
        await video.play();
        setActive(true);
        setError(null);
      } catch (err) {
        // Autoplay was refused (no user gesture yet) — retry on the next one.
        setActive(false);
        setError(err);
      }
      return;
    }

    if (sentinelRef.current) return;
    try {
      const sentinel = await navigator.wakeLock.request("screen");
      sentinelRef.current = sentinel;
      setActive(true);
      setError(null);
      sentinel.addEventListener("release", () => {
        if (sentinelRef.current === sentinel) {
          sentinelRef.current = null;
          setActive(false);
        }
      });
    } catch (err) {
      // Thrown when the tab is hidden, the battery is low, or the OS refuses.
      sentinelRef.current = null;
      setActive(false);
      setError(err);
    }
  }, [getVideo]);

  useEffect(() => {
    if (!isSupported) return;

    if (!enabled) {
      release();
      return;
    }

    request();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") request();
    }
    // Playback/native locks can only start from a user gesture, so retry on the
    // next interaction whenever an earlier attempt was rejected.
    function handleUserGesture() {
      request();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("pointerdown", handleUserGesture);
    document.addEventListener("keydown", handleUserGesture);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("pointerdown", handleUserGesture);
      document.removeEventListener("keydown", handleUserGesture);
      release();
    };
  }, [enabled, request, release]);

  return { supported: isSupported, active, error };
}

export default useWakeLock;
