import { kmers, render } from "../src/kmers";

import * as mocha from "mocha";
import * as chai from "chai";
const expect = chai.expect;

function qgrams(k: number, txt: string): string[] {
  const res: string[] = [];
  for (let i = 0; i + k <= txt.length; ++i) {
    let q = txt.slice(i, i + k).toUpperCase();
    if (q.indexOf("N") >= 0) {
      continue;
    }
    q = q.replaceAll('U', 'T');
    q = q.replaceAll('u', 'T');
    res.push(q);
  }
  return res;
}

function rcStr(x: string): string {
  const parts: string[] = [];
  for (let i = 0; i < x.length; ++i) {
    let y: string;
    switch (x[i]) {
      case "A":
      case "a": {
        y = "T";
        break;
      }
      case "C":
      case "c": {
        y = "G";
        break;
      }
      case "G":
      case "g": {
        y = "C";
        break;
      }
      case "T":
      case "t":
      case "U":
      case "u": {
        y = "A";
        break;
      }
      default: {
        y = x[i];
      }
    }
    parts.push(y);
  }
  parts.reverse();
  return parts.join("");
}

function mkExpected(k: number, seq: string): { fwd: string[]; rev: string[] } {
  const qs = qgrams(k, seq);
  const rs: string[] = [];
  for (const q of qs) {
    rs.push(rcStr(q));
  }
  return { fwd: qs, rev: rs };
}

it("make a 25-mer", () => {
  const seq = "CTCCTCTGAGGATTTTAAAGAAGCC";
  const qes = rcStr(seq);
  const K = 25;
  const x = kmers(K, seq);
  expect(x.fwd.length).to.equal(1);
  expect(render(K, x.fwd[0])).to.eql(seq);
  expect(x.rev.length).to.equal(1);
  expect(render(K, x.rev[0])).to.eql(qes);
});

describe("make some k-mers", () => {
  const seq1 = "CTCCTCTGAGGATTTTAAAGAAGCCATTaTCACCcCNGTCAAGGTTCCAAGAGTTgGCTGCCAGCCAGTAGGGAACTCCATtCTCTACTCCCCAGCCCAG";
  const seq2 = "CTCCTCTGAGGATTTTAAAGAAGCCATTATCACCCCNGTCAAGGTTCCAAGAGUTGGCTGCCAGCCAGuAGGGAACTCCATTCTCTACTCCCCAGCCCAN";
  it("k=5", () => {
    const k = 5;
    const s = mkExpected(k, seq1);
    const t = kmers(k, seq1);
    expect(t.fwd.length).to.equal(s.fwd.length);
    expect(t.rev.length).to.equal(s.rev.length);
    for (let i = 0; i < t.fwd.length; ++i) {
      expect(render(k, t.fwd[i])).to.eql(s.fwd[i]);
    }
    for (let i = 0; i < t.rev.length; ++i) {
      expect(render(k, t.rev[i])).to.eql(s.rev[i]);
    }
  });
  it("k=25", () => {
    const k = 25;
    const s = mkExpected(k, seq2);
    const t = kmers(k, seq2);
    expect(t.fwd.length).to.equal(s.fwd.length);
    expect(t.rev.length).to.equal(s.rev.length);
    for (let i = 0; i < t.fwd.length; ++i) {
      expect(render(k, t.fwd[i])).to.eql(s.fwd[i]);
    }
    for (let i = 0; i < t.rev.length; ++i) {
      expect(render(k, t.rev[i])).to.eql(s.rev[i]);
    }
  });
});
