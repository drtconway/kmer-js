"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFasta = void 0;
function* parseFasta(lines) {
    let nm = null;
    let seq = [];
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
        }
        else {
            seq.push(value.replaceAll(/[ \t\r\n\v\f]+/g, ''));
        }
    }
    if (nm != null) {
        yield { name: nm, sequence: seq.join("") };
    }
}
exports.parseFasta = parseFasta;
