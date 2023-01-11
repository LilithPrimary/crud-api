export const isValidJson = (json: string) => {
  try {
    const data = JSON.parse(json);
    return data;
  } catch (_) {
    return false;
  }
};
