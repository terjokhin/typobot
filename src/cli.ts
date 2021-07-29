const p1: Promise<boolean> = new Promise<boolean>((resolve) => resolve(true));

async function rr(r: boolean): Promise<number> {
  const p = new Promise<number>((resolve) => {
    if (r) {
      resolve(1);
    }
    resolve(0);
  });

  return p;
}

async function result() {
  const r = await p1.then(rr);
  console.log(r);
}

result();
