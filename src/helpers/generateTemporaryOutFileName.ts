function generateTemporaryOutFileName() {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `type-extract-temp-${randomString}.json`;
}

export { generateTemporaryOutFileName };
