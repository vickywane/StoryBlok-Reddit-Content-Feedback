
// @ts-ignore
export function filterCommentData(data: any, keysToKeep: any[]) {
  if (Array.isArray(data)) {
    // Process arrays recursively
    // @ts-ignore
    return data.map((item) => filterCommentData(item, keysToKeep));
  } else if (data && typeof data === "object") {
    // Handle objects
    let result = {};
    for (let key in data) {
      if (keysToKeep.includes(key)) {
        // @ts-ignore
        result[key] = data[key];
      } else if (typeof data[key] === "object" && data[key] !== null) {
        // Recurse into nested objects/arrays
        // @ts-ignore
        result[key] = filterCommentData(data[key], keysToKeep);
      }
    }
    return result;
  }
  // Primitives stay as-is
  return data;
}