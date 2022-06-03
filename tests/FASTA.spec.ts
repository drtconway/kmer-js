import { parseFasta } from "../src/FASTA";

import * as mocha from "mocha";
import * as chai from "chai";
const expect = chai.expect;

const phiX = [
  ">NC_001422.1 Escherichia phage phiX174, complete genome",
  "GAGTTTTATCGCTTCCATGACGCAGAAGTTAACACTTTCGGATATTTCTGATGAGTCGAAAAATTATCTT",
  "GATAAAGCAGGAATTACTACTGCTTGTTTACGAATTAAATCGAAGTGGACTGCTGGCGGAAAATGAGAAA",
  "ATTCGACCTATCCTTGCGCAGCTCGAGAAGCTCTTACTTTGCGACCTTTCGCCATCAACTAACGATTCTG",
  "TCAAAAACTGACGCGTTGGATGAGGAGAAGTGGCTTAATATGCTTGGCACGTTCGTCAAGGACTGGTTTA",
  "GATATGAGTCACATTTTGTTCATGGTAGAGATTCTCTTGTTGACATTTTAAAAGAGCGTGGATTACTATC",
  "TGAGTCCGATGCTGTTCAACCACTAATAGGTAAGAAATCATGAGTCAAGTTACTGAACAATCCGTACGTT",
  "TCCAGACCGCTTTGGCCTCTATTAAGCTCATTCAGGCTTCTGCCGTTTTGGATTTAACCGAAGATGATTT",
  "CGATTTTCTGACGAGTAACAAAGTTTGGATTGCTACTGACCGCTCTCGTGCTCGTCGCTGCGTTGAGGCT",
  "TGCGTTTATGGTACGCTGGACTTTGTGGGATACCCTCGCTTTCCTGCTCCTGTTGAGTTTATTGCTGCCG",
  "TCATTGCTTATTATGTTCATCCCGTCAACATTCAAACGGCCTGTCTCATCATGGAAGGCGCTGAATTTAC",
  "GGAAAACATTATTAATGGCGTCGAGCGTCCGGTTAAAGCCGCTGAATTGTTCGCGTTTACCTTGCGTGTA",
  "CGCGCAGGAAACACTGACGTTCTTACTGACGCAGAAGAAAACGTGCGTCAAAAATTACGTGCGGAAGGAG",
  "TGATGTAATGTCTAAAGGTAAAAAACGTTCTGGCGCTCGCCCTGGTCGTCCGCAGCCGTTGCGAGGTACT",
  "AAAGGCAAGCGTAAAGGCGCTCGTCTTTGGTATGTAGGTGGTCAACAATTTTAATTGCAGGGGCTTCGGC",
  "CCCTTACTTGAGGATAAATTATGTCTAATATTCAAACTGGCGCCGAGCGTATGCCGCATGACCTTTCCCA",
  "TCTTGGCTTCCTTGCTGGTCAGATTGGTCGTCTTATTACCATTTCAACTACTCCGGTTATCGCTGGCGAC",
  "TCCTTCGAGATGGACGCCGTTGGCGCTCTCCGTCTTTCTCCATTGCGTCGTGGCCTTGCTATTGACTCTA",
  "CTGTAGACATTTTTACTTTTTATGTCCCTCATCGTCACGTTTATGGTGAACAGTGGATTAAGTTCATGAA",
  "GGATGGTGTTAATGCCACTCCTCTCCCGACTGTTAACACTACTGGTTATATTGACCATGCCGCTTTTCTT",
  "GGCACGATTAACCCTGATACCAATAAAATCCCTAAGCATTTGTTTCAGGGTTATTTGAATATCTATAACA",
  "ACTATTTTAAAGCGCCGTGGATGCCTGACCGTACCGAGGCTAACCCTAATGAGCTTAATCAAGATGATGC",
  "TCGTTATGGTTTCCGTTGCTGCCATCTCAAAAACATTTGGACTGCTCCGCTTCCTCCTGAGACTGAGCTT",
  "TCTCGCCAAATGACGACTTCTACCACATCTATTGACATTATGGGTCTGCAAGCTGCTTATGCTAATTTGC",
  "ATACTGACCAAGAACGTGATTACTTCATGCAGCGTTACCATGATGTTATTTCTTCATTTGGAGGTAAAAC",
  "CTCTTATGACGCTGACAACCGTCCTTTACTTGTCATGCGCTCTAATCTCTGGGCATCTGGCTATGATGTT",
  "GATGGAACTGACCAAACGTCGTTAGGCCAGTTTTCTGGTCGTGTTCAACAGACCTATAAACATTCTGTGC",
  "CGCGTTTCTTTGTTCCTGAGCATGGCACTATGTTTACTCTTGCGCTTGTTCGTTTTCCGCCTACTGCGAC",
  "TAAAGAGATTCAGTACCTTAACGCTAAAGGTGCTTTGACTTATACCGATATTGCTGGCGACCCTGTTTTG",
  "TATGGCAACTTGCCGCCGCGTGAAATTTCTATGAAGGATGTTTTCCGTTCTGGTGATTCGTCTAAGAAGT",
  "TTAAGATTGCTGAGGGTCAGTGGTATCGTTATGCGCCTTCGTATGTTTCTCCTGCTTATCACCTTCTTGA",
  "AGGCTTCCCATTCATTCAGGAACCGCCTTCTGGTGATTTGCAAGAACGCGTACTTATTCGCCACCATGAT",
  "TATGACCAGTGTTTCCAGTCCGTTCAGTTGTTGCAGTGGAATAGTCAGGTTAAATTTAATGTGACCGTTT",
  "ATCGCAATCTGCCGACCACTCGCGATTCAATCATGACTTCGTGATAAAAGATTGAGTGTGAGGTTATAAC",
  "GCCGAAGCGGTAAAAATTTTAATTTTTGCCGCTGAGGGGTTGACCAAGCGAAGCGCGGTAGGTTTTCTGC",
  "TTAGGAGTTTAATCATGTTTCAGACTTTTATTTCTCGCCATAATTCAAACTTTTTTTCTGATAAGCTGGT",
  "TCTCACTTCTGTTACTCCAGCTTCTTCGGCACCTGTTTTACAGACACCTAAAGCTACATCGTCAACGTTA",
  "TATTTTGATAGTTTGACGGTTAATGCTGGTAATGGTGGTTTTCTTCATTGCATTCAGATGGATACATCTG",
  "TCAACGCCGCTAATCAGGTTGTTTCTGTTGGTGCTGATATTGCTTTTGATGCCGACCCTAAATTTTTTGC",
  "CTGTTTGGTTCGCTTTGAGTCTTCTTCGGTTCCGACTACCCTCCCGACTGCCTATGATGTTTATCCTTTG",
  "AATGGTCGCCATGATGGTGGTTATTATACCGTCAAGGACTGTGTGACTATTGACGTCCTTCCCCGTACGC",
  "CGGGCAATAACGTTTATGTTGGTTTCATGGTTTGGTCTAACTTTACCGCTACTAAATGCCGCGGATTGGT",
  "TTCGCTGAATCAGGTTATTAAAGAGATTATTTGTCTCCAGCCACTTAAGTGAGGTGATTTATGTTTGGTG",
  "CTATTGCTGGCGGTATTGCTTCTGCTCTTGCTGGTGGCGCCATGTCTAAATTGTTTGGAGGCGGTCAAAA",
  "AGCCGCCTCCGGTGGCATTCAAGGTGATGTGCTTGCTACCGATAACAATACTGTAGGCATGGGTGATGCT",
  "GGTATTAAATCTGCCATTCAAGGCTCTAATGTTCCTAACCCTGATGAGGCCGCCCCTAGTTTTGTTTCTG",
  "GTGCTATGGCTAAAGCTGGTAAAGGACTTCTTGAAGGTACGTTGCAGGCTGGCACTTCTGCCGTTTCTGA",
  "TAAGTTGCTTGATTTGGTTGGACTTGGTGGCAAGTCTGCCGCTGATAAAGGAAAGGATACTCGTGATTAT",
  "CTTGCTGCTGCATTTCCTGAGCTTAATGCTTGGGAGCGTGCTGGTGCTGATGCTTCCTCTGCTGGTATGG",
  "TTGACGCCGGATTTGAGAATCAAAAAGAGCTTACTAAAATGCAACTGGACAATCAGAAAGAGATTGCCGA",
  "GATGCAAAATGAGACTCAAAAAGAGATTGCTGGCATTCAGTCGGCGACTTCACGCCAGAATACGAAAGAC",
  "CAGGTATATGCACAAAATGAGATGCTTGCTTATCAACAGAAGGAGTCTACTGCTCGCGTTGCGTCTATTA",
  "TGGAAAACACCAATCTTTCCAAGCAACAGCAGGTTTCCGAGATTATGCGCCAAATGCTTACTCAAGCTCA",
  "AACGGCTGGTCAGTATTTTACCAATGACCAAATCAAAGAAATGACTCGCAAGGTTAGTGCTGAGGTTGAC",
  "TTAGTTCATCAGCAAACGCAGAATCAGCGGTATGGCTCTTCTCATATTGGCGCTACTGCAAAGGATATTT",
  "CTAATGTCGTCACTGATGCTGCTTCTGGTGTGGTTGATATTTTTCATGGTATTGATAAAGCTGTTGCCGA",
  "TACTTGGAACAATTTCTGGAAAGACGGTAAAGCTGATGGTATTGGCTCTAATTTGTCTAGGAAATAACCG",
  "TCAGGATTGACACCCTCCCAATTGTATGTTTTCATGCCTCCAAATCTTGGAGGCTTTTTTATGGTTCGTT",
  "CTTATTACCCTTCTGAATGTCACGCTGATTATTTTGACTTTGAGCGTATCGAGGCTCTTAAACCTGCTAT",
  "TGAGGCTTGTGGCATTTCTACTCTTTCTCAATCCCCAATGCTTGGCTTCCATAAGCAGATGGATAACCGC",
  "ATCAAGCTCTTGGAAGAGATTCTGTCTTTTCGTATGCAGGGCGTTGAGTTCGATAATGGTGATATGTATG",
  "TTGACGGCCATAAGGCTGCTTCTGACGTTCGTGATGAGTTTGTATCTGTTACTGAGAAGTTAATGGATGA",
  "ATTGGCACAATGCTACAATGTGCTCCCCCAACTTGATATTAATAACACTATAGACCACCGCCCCGAAGGG",
  "GACGAAAAATGGTTTTTAGAGAACGAGAAGACGGTTACGCAGTTTTGCCGCAAGCTGGCTGCTGAACGCC",
  "CTCTTAAGGATATTCGCGATGAGTATAATTACCCCAAAAAGAAAGGTATTAAGGATGAGTGTTCAAGATT",
  "GCTGGAGGCCTCCACTATGAAATCGCGTAGAGGCTTTGCTATTCAGCGTTTGATGAATGCAATGCGACAG",
  "GCTCATGCTGATGGTTGGTTTATCGTTTTTGACACTCTCACGTTGGCTGACGACCGATTAGAGGCGTTTT",
  "ATGATAATCCCAATGCTTTGCGTGACTATTTTCGTGATATTGGTCGTATGGTTCTTGCTGCCGAGGGTCG",
  "CAAGGCTAATGATTCACACGCCGACTGCTATCAGTATTTTTGTGTGCCTGAGTATGGTACAGCTAATGGC",
  "CGTCTTCATTTCCATGCGGTGCACTTTATGCGGACACTTCCTACAGGTAGCGTTGACCCTAATTTTGGTC",
  "GTCGGGTACGCAATCGCCGCCAGTTAAATAGCTTGCAAAATACGTGGCCTTATGGTTACAGTATGCCCAT",
  "CGCAGTTCGCTACACGCAGGACGCTTTTTCACGTTCTGGTTGGTTGTGGCCTGTTGATGCTAAAGGTGAG",
  "CCGCTTAAAGCTACCAGTTATATGGCTGTTGGTTTCTATGTGGCTAAATACGTTAACAAAAAGTCAGATA",
  "TGGACCTTGCTGCTAAAGGTCTAGGAGCTAAAGAATGGAACAACTCACTAAAAACCAAGCTGTCGCTACT",
  "TCCCAAGAAGCTGTTCAGAATCAGAATGAGCCGCAACTTCGGGATGAAAATGCTCACAATGACAAATCTG",
  "TCCACGGAGTGCTTAATCCAACTTACCAAGCTGGGTTACGACGCGACGCCGTTCAACCAGATATTGAAGC",
  "AGAACGCAAAAAGAGAGATGAGATTGAGGCTGGGAAAAGTTACTGTAGCCGACGTTTTGGCGGCGCAACC",
  "TGTGACGACAAATCTGCTCAAATTTATGCGCGCTTCGATAAAAATGATTGGCGTATCCAACCTGCA",
];

const tRNAs = [
  ">URS00000012EC_9606 Homo sapiens (human) tRNA-Ile",
  "AGAAATATGTCTGATAAAAGAGTTACTTTGATAGAGTAAATAATAGGAGCTTAGACCCCC",
  "TTATTTCTA",
  ">URS0000001346_9606 Homo sapiens (human) tRNA-Lys",
  "AAGCCCGGCTAGCTCAGTCGATAGAGCATGAGACTCTTAATCTCAGGGTCGTGGGTTCGA",
  "GCCGCACGTTGGG",
  ">URS0000003B66_9606 Homo sapiens (human) tRNA-Pro",
  "AGAGAATAGTTTAAATTAGAATCTTAGCTTTGGGTGCTAATGGTGGAGTTAAAGACTTTT",
  "TCTCTGATT",
  ">URS0000006998_9606 Homo sapiens (human) tRNA-Ser",
  "TTGAAAAAGTCATGGAGGCCATGGGGTTGGCTTGAAACCAGCTTTGGAGGGTTCGATTCC",
  "TTCCTTTTTTGT",
  ">URS0000006BBF_9606 Homo sapiens (human) tRNA-Arg",
  "TGGTATATAGTTTAAACAAAACGAATGATTTCGACTCATTAGATTATGATAATCATATCT",
  "ACCAA",
  ">URS000000920F_9606 Homo sapiens (human) tRNA-Pro",
  "CAGAGAATAGTTTAAATTAGAATTTTAGCTTTGGGTGCTAATGGTGGAGTTAAAGACTTT",
  "TTCTCTGAT",
  ">URS0000009B16_9606 Homo sapiens (human) tRNA-Pro",
  "CTCGTTGGTCTAGGGGTATGATTCTCGCTTAGGGTGCGAGAGGTCCCGGGTTCAAATCCC",
  "GGACGAGCCCGG",
  ">URS000000A699_9606 Homo sapiens (human) tRNA-Val",
  "CAGAGTGTAGCTTAACANAAAGCACCCAACTTACACTTAGGAGATTTCAACTTAACTTGA",
  "CCGCTCTGA",
  ">URS000000DC32_9606 Homo sapiens (human) tRNA-Ile",
  "ARAAATATGTCTGATAAAAGAGTTACTTTGATAGAGTAAATAATAGGAGCTTAAACCCCC",
  "TTATTTCTA",
  ">URS000000EA5A_9606 Homo sapiens (human) tRNA-Arg",
  "TGGTATATAGTTTAAACAAAACGAATGATTTCGACTCATTAAATTATGATAACCATATCT",
  "ACCAA",
  ">URS000000EAE4_9606 Homo sapiens (human) partial tRNA-Thr",
  "GGAGATGAAAACCTTTTCCAAGGACA",
  ">URS000000EB00_9606 Homo sapiens (human) tRNA-His",
  "GTAAATGTAGTTTAACCAAAACATCAGATTGTGAATCTGACAACAGAGGCTTACGACCCC",
  "TTATTTACC",
  ">URS000000EE2E_9606 Homo sapiens (human) tRNA-Lys",
  "CACTGTAAAGCTAACTTAGCATTAACCTTTTAAGTTAAAGATTAAGAGAGCCAACACCTC",
  "TTTACAGTGA",
  ">URS0000010A01_9606 Homo sapiens (human) tRNA-Phe",
  "NNNNNTGTAGCTTACCTCCTCAAAGCAATACACTGAAAATGTTTAGACGGGCTCACATCA",
  "CCCCATAAACA",
  ">URS00000133BF_9606 Homo sapiens (human) tRNA-Ala",
  "TAAGGACTGCAAAACCCCACTCTGCATCAACTGAACGCAAATCAGCCACTTTAATTAAGC",
  "TAAGCCCTT",
  ">URS0000013C59_9606 Homo sapiens (human) tRNA-His",
  "GTAAATATAGTTTAACCAAAACATCAGACTGTGAATCTGACAACAGAGGCTTACGACCCC",
  "TTATTTACC",
  ">URS0000013E6C_9606 Homo sapiens (human) tRNA-Tyr",
  "TGAGGTAAAATGGCTGAGTGAAGCATTGGACTGTAAATCTAAAGACAGGGGTTAGGCCTC",
  "TTTTTACCA",
  ">URS00000141BF_9606 Homo sapiens (human) tRNA-Pro",
  "CAGAGACTAGTTTAAATTAGAATCTTAGCTTTGGGTGCTAATGGTGGAGTTAAAGACTTT",
  "TTCTCTGAT",
  ">URS000001544D_9606 Homo sapiens (human) tRNA-Asp",
  "AAGGTATTAGAAAAACTATTTCATAACTTTGTCAAAGTTAAATTATAGGCTAAATCCTAT",
  "ATATCTTA",
  ">URS00000166EE_9606 Homo sapiens (human) tRNA-Cys",
  "AGCTCCGAGGTGATTTTCATATTGAATTGCAAATTCGAAGAAGCAGCTTTAAACCTGCCG",
  "GGGCTT",
  ">URS00000177BE_9606 Homo sapiens (human) tRNA-Leu",
  "ACTTTTAAAGGATAACAGCTATCCATTGGTCTTAGGCCCCAGAAATTTTGGTGCAACTCC",
  "AAATAAAAGTA",
  ">URS0000017BA7_9606 Homo sapiens (human) tRNA-Asp",
  "AAGGTATTAGAAAAACCATTTCATAGCTTTGTCAAAGTTAAATTATAGGCTAAATCCTAT",
  "ATATCTTA",
  ">URS000001924B_9606 Homo sapiens (human) tRNA-Phe",
  "GTTTATGTAGCTTACCTCCTCAAAGCGATACACTGAAAATGTTTAGACGGGCTCACATCA",
  "CCCCATAAACA",
  ">URS000001986D_9606 Homo sapiens (human) tRNA-OTHER",
  "CCAGCTAGCTCAGCCGGTAGAGCACAAGACTCTTAATCTCAGGGTCGTGGGTTTGAGCCC",
  "TGTGTTGAGCACA",
  ">URS0000019953_9606 Homo sapiens (human) tRNA-Pro",
  "TCAGAGAAAAAGTCTTTAACTCCACCATTAGCACCCAAAGCTAAGATTCTAATTTAAACT",
  "ATTCTCTGT",
  ">URS000001B2EC_9606 Homo sapiens (human) tRNA-Gly",
  "ACTCTTCTAGTATAAATAGTACCGTTAACTTCCAATTAACTAGTTTTGACAACATTCAAA",
  "AAAGAGTA",
  ">URS000001BF29_9606 Homo sapiens (human) tRNA-Trp",
  "AGAAATTTAGGTTAAATACAGACCAAGAGCCNNNNNNGCCCTCAGTAAGTTGCAATACTT",
  "AATTT",
  ">URS000001FD4B_9606 Homo sapiens (human) tRNA-His",
  "GTAAATATAGTTTAACCAAAACATCAGATTGTGAATCTGACAACAGAGGCTTATGGCCCC",
  "TTATTTACC",
  ">URS00000208B4_9606 Homo sapiens (human) tRNA-Asn",
  "TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAGCTAAGTGTTTGTGGGTTTAAGT",
  "CCCATTGGTCTAG",
];

describe("Basic FASTA parsing", () => {
  it("empty", () => {
    const none: string[] = [];
    const entries = [...parseFasta(none.values())];
    expect(entries.length).to.equal(0);
  });
  it("phiX", () => {
    const entries = [...parseFasta(phiX.values())];
    expect(entries.length).to.equal(1);
    expect(entries[0].name).to.eql("NC_001422.1 Escherichia phage phiX174, complete genome");
  });
  it("tRNA", () => {
    const entries = [...parseFasta(tRNAs.values())];
    expect(entries.length).to.equal(29);
    expect(entries[28].name).to.eql("URS00000208B4_9606 Homo sapiens (human) tRNA-Asn");
    expect(entries[28].sequence).to.eql("TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAGCTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG");
  });
});