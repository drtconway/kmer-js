function nucEnc(s: string): bigint | null {
  switch (s) {
    case "a":
    case "A": {
      return 0n;
    }
    case "c":
    case "C": {
      return 1n;
    }
    case "g":
    case "G": {
      return 2n;
    }
    case "t":
    case "T":
    case "u":
    case "U": {
      return 3n;
    }
    default: {
      return null;
    }
  }
}

export function kmers(K: number, seq: string): { fwd: BigUint64Array; rev: BigUint64Array } {
  const k = BigInt(K);
  const z = seq.length;
  const msk = (1n << BigInt(2 * K)) - 1n;
  const s = BigInt(2 * (K - 1));
  let i = 0;
  let j = 0;
  let n = 0;
  while (i + K <= z) {
    while (i + j < z && j < K) {
      const b = nucEnc(seq[i + j]);
      if (b == null) {
        i += j + 1;
        j = 0;
      } else {
        j += 1;
      }
    }
    if (j == K) {
      n += 1;
      j -= 1;
    }
    i += 1;
  }

  const N = n;
  const fwd: BigUint64Array = new BigUint64Array(N);
  const rev: BigUint64Array = new BigUint64Array(N);

  n = 0;
  i = 0;
  j = 0;
  let x = 0n;
  let y = 0n;
  while (i + K <= z) {
    while (i + j < z && j < K) {
      const b = nucEnc(seq[i + j]);
      if (b == null) {
        i += j + 1;
        j = 0;
        x = 0n;
        y = 0n;
      } else {
        x = (x << 2n) | b;
        y = (y >> 2n) | ((3n - b) << s);
        j += 1;
      }
    }
    if (j == K) {
      x &= msk;
      fwd[n] = x;
      rev[n] = y;
      j -= 1;
      n += 1;
    }
    i += 1;
  }
  return { fwd, rev };
}

const bases: string[] = ["A", "C", "G", "T"];
export function render(K: number, x: bigint): string {
  const r: string[] = [];
  for (let i = 0; i < K; ++i) {
    r.push(bases[Number(x & 3n)]);
    x >>= 2n;
  }
  r.reverse();
  return r.join("");
}
