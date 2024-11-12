export function parseToObject(input: any): object {
  try {
    return JSON.parse(input);
  } catch (error) {
    return {};
  }
}
