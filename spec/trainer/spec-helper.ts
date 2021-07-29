export function StringifiedContains(obj: any, list: any[]) {
  for (const item of list) {
    if (JSON.stringify(item) === JSON.stringify(obj)) {
      return true;
    }
  }
  return false;
}
