import TrieNode from "./trie-node";
import Candidate from "./candidate";

/**
 * this is used to represent words that have been trained in
 * a tree structure using trie-nodes
 */
export default class Trie {
  readonly root = new TrieNode();

  /**
   * this is a recursive method that traverses the trie-nodes
   * which strips the first letter of the current word and
   * creates new nodes from the stripped letters as it goes.
   * when the end of a word is reach the count is incremented
   * for the leaf node
   * @param word the current word
   * @param node the current node, defaults to root
   */
  processWord(word: string, node = this.root) {
    const letter = word[0];
    let next_node = node.children.get(letter);
    // if we already have a word that follows this path
    if (!next_node) {
      // if we're going down a new path
      next_node = new TrieNode(letter);
      node.children.set(letter, next_node);
    }
    // if we're at the end of a word
    if (word.length == 1) {
      next_node.count++;
    }
    // if there are still letters to process
    if (word.length > 1) {
      const rest = word.slice(1);
      this.processWord(rest, next_node);
    }
  }

  /**
   * this method is a recursive depth first traversal to count all the nodes
   * for a given starting node
   * @param node the current node, defaults to root
   * @param count the current cound, defaults to 0
   */
  countNodes(node = this.root, count = 0) {
    for (const value of Array.from(node.children.values())) {
      count = this.countNodes(value, count + 1);
    }
    return count;
  }

  /**
   * this is a recursive method to get all the candidates for a given subtree
   * @param node the current node, defeaults to root
   * @param word the stored word value, used recursively to determine when to add a candidate
   * @param words the list of candidates to return
   */
  getDictionary(node = this.root, word = "", words: Candidate[] = []) {
    // if we made it to a full word
    if (node.count > 0) {
      const candidate = new Candidate(word, node.count);
      let insert_at = 0;
      let found_spot = false;
      // candidate list is a sorted list by confidence, then alphabetical
      for (let i = 0; i < words.length; i++) {
        const cur = words[i];
        insert_at = i;
        if (cur.confidence < candidate.confidence) {
          found_spot = true;
        } else if (cur.confidence == candidate.confidence) {
          // stable sorting provided by comparing words
          if (cur.word > candidate.word) {
            found_spot = true;
          }
        }
        if (found_spot) {
          break;
        }
      }
      if (found_spot) words.splice(insert_at, 0, candidate);
      else words.push(candidate);
    }

    // recursively iterate over this path's children
    for (const next_node of Array.from(node.children.values())) {
      this.getDictionary(next_node, word + next_node.letter, words);
    }
    return words;
  }

  /**
   * this method returns a list of candidates for a given fragment
   * @param fragment
   */
  getWords(fragment: string) {
    // lets skip null and blank words?
    if (!fragment || fragment === "") {
      return [];
    }
    let node = this.root;
    for (const c of fragment) {
      const character = c;
      // find the deepest node we can
      const next = node.children.get(character);
      if (next) {
        node = next;
      } else {
        // if we make it down a path where there are no words
        return [];
      }
    }

    return this.getDictionary(node, fragment, []);
  }
}
