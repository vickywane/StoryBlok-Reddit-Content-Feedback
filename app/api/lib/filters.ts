export function filterCommentData(data: unknown, keysToKeep: string[]) {
  if (Array.isArray(data)) {
    return data.map((item) => filterCommentData(item, keysToKeep));
  } else if (data && typeof data === "object") {

    const result = {};
    for (const key in data) {
      if (keysToKeep.includes(key)) {
        result[key] = data[key];
      } else if (typeof data[key] === "object" && data[key] !== null) {
        
        result[key] = filterCommentData(data[key], keysToKeep);
      }
    }
    return result;
  }
  // Primitives stay as-is
  return data;
}
