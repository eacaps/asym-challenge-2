/**
 * This class represents the nodes in the
 * trie structure.
 */
export default class TrieNode {
  /**
   * this property is optional to represent the top level node
   */
  readonly letter?: string;
  /**
   * this property represents the number of times a
   * word has ended at this node
   */
  count = 0;
  readonly children = new Map<string, TrieNode>();

  constructor(letter?: string) {
    this.letter = letter;
  }
}
