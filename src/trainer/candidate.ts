/**
 * This class represents a Trie traversal result
 */
export default class Candidate {
  readonly word: string;
  readonly confidence: number;

  constructor(word: string, confidence: number) {
    this.word = word;
    this.confidence = confidence;
  }
}
