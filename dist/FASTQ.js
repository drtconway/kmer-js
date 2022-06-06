"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFastq = void 0;
function* parseFastq(lines) {
    let buf = [];
    let n = 0;
    while (true) {
        const { done, value } = lines.next();
        if (done == true) {
            break;
        }
        n += 1;
        buf.push(value.trim());
        if (buf.length == 4) {
            yield [buf[0], buf[1], buf[2], buf[3]];
            buf = [];
        }
    }
    if (buf.length > 0) {
        throw new Error(`last FASTQ read is incomplete (line ${n})`);
    }
}
exports.parseFastq = parseFastq;
