const dbName = "dbd_buildout_db";

export const initIndexDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      reject("IndexedDB error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      console.log("indexDb successfully initialized")
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notAllowed')) {
        db.createObjectStore('notAllowed', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('currentSelections')) {
        db.createObjectStore('currentSelections', { keyPath: 'id' });
      }
    };
  });
};

export const updateData = (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject("Error updating data: " + event.target.errorCode);
    };
  });
};

export const deleteData = (db, storeName, key) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite")
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => {
      resolve("Data successfully deleted");
    };

    request.onerror = (event) => {
      reject("Error updating data: " + event.target.errorCode);
    };
  });
}
