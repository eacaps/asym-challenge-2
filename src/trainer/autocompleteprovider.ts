import Trie from "./trie";

/**
 * This class is responsible for providing the ability to add a passage
 * to the trie structure and to retrieve a list of candidates given
 * a string to check
 */
export default class Trainer {
  readonly trie = new Trie();

  /**
   * this method updates the trie structure given the input
   * @param passage the string to break down into words to add to the trie
   */
  train(passage: string) {
    const words = passage.split(" ");
    for (const word of words) {
      // strip non-alphanumeric
      const stripped_word = word.replace(/[^a-zA-Z0-9 -]$/g, "").toLowerCase();
      this.trie.processWord(stripped_word);
    }
  }

  /**
   * this method returns the candidates for a given fragment
   * @param fragment the fragment to check
   */
  getWords(fragment: string) {
    // always send lowercase
    return this.trie.getWords(fragment.toLowerCase());
  }
}
