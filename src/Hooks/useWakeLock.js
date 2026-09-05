import { useCallback, useEffect, useRef, useState } from "react";

const isSupported = typeof navigator !== "undefined" && "wakeLock" in navigator;

/**
 * Keeps the screen from dimming/locking while the page is open.
 *
 * Uses the Screen Wake Lock API (Chrome/Edge/Android, Safari 16.4+). The lock is
 * dropped by the browser whenever the tab is hidden, so it is re-acquired on
 * every visibilitychange while `enabled` is true.
 */
export function useWakeLock(enabled) {
  const sentinelRef = useRef(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  const release = useCallback(async () => {
    const sentinel = sentinelRef.current;
    sentinelRef.current = null;
    setActive(false);
    if (sentinel && !sentinel.released) {
      try {
        await sentinel.release();
      } catch {
        // Nothing useful to do: the lock is gone either way.
      }
    }
  }, []);

  const request = useCallback(async () => {
    if (!isSupported || sentinelRef.current || document.visibilityState !== "visible") return;
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
  }, []);

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

    // Some browsers only grant the lock during a user gesture, so retry on the
    // next interaction if the initial request was rejected.
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
