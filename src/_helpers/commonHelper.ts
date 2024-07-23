export const hardRefreshAndEmptyCache = async () => {
  if ("caches" in window) {
    try {
      const keys = await caches.keys();
      keys.forEach((key) => {
        // Delete all the cache files
        caches.delete(key);
      });
    } catch (error) {}
  }
  window.location.reload();
};
