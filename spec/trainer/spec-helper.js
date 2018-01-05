module.exports = {
  StringifiedContains: (obj, list) => {
    for (const item of list) {
      if (JSON.stringify(item) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }
}
