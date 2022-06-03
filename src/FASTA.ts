export interface FastaEntry {
  name: string;
  sequence: string;
}

export function* parseFasta(lines: Iterator<string>): Generator<FastaEntry> {
  let nm: string | null = null;
  let seq: string[] = [];
  while (true) {
    const { done, value } = lines.next();
    if (done == true) {
      break;
    }
    if (value.startsWith(">")) {
      if (nm != null) {
        yield { name: nm, sequence: seq.join("") };
      }
      nm = value.slice(1).trim();
      seq = [];
    } else {
      seq.push(value.replaceAll(/[ \t\r\n\v\f]+/g, ''));
    }
  }
  if (nm != null) {
    yield { name: nm, sequence: seq.join("") };
  }
}
