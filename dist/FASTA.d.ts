export interface FastaEntry {
    name: string;
    sequence: string;
}
export declare function parseFasta(lines: Iterator<string>): Generator<FastaEntry>;
