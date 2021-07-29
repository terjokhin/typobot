async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function asyncTimeout(ms: number,
  fn: { (): void }): Promise<void> {
  await wait(ms);
  return fn();
}
