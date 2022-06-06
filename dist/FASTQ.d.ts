export declare type FastqEntry = [string, string, string, string];
export declare function parseFastq(lines: Iterator<string>): Generator<FastqEntry>;
