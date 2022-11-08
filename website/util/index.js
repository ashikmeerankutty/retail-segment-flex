export const StaticStrings = {
    SEGMENT_EVENT_DIV_VIEW: "Page Region Viewed",
    SEGMENT_ANONYMOUS_ID: "SEGMENT_ANONYMOUS_ID",
  };
  
  export const getBaseUrl = () => {
    try {
      const host = window.location.host;
      return host.includes("localhost:")
        ? "http://localhost:3000"
        : `https://${host}`;
    } catch (err) {
      //console.error(err);
      return "http://localhost:3000";
    }
  };
  
  export const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };
  
  /** Check if JS Object is empty. */
  export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  