export function getOrThrow(key: string, err: {(): Error}): string {
  const result = process.env[key];
  if (typeof result === 'string') {
    return result;
  }
  throw err();
}

export function getOrElse(key: string, orElse: string): string {
  const result = process.env[key];
  if (typeof result === 'string') {
    return result;
  }
  return orElse;
}
