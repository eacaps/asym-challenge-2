import TrieNode from "./trie-node";
import Candidate from './candidate';

export default class Trie {
  readonly root = new TrieNode(null);

  constructor() {}

  processWord(word:string,node=this.root) {
    const letter = word[0];
    let next_node = null;
    // if we already have a word that follows this path
    if (node.children[letter]) {
      next_node = node.children[letter];
    } else {
      // if we're going down a new path
      next_node = new TrieNode(letter);
      node.children[letter] = next_node;
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

  countNodes(node = this.root, count = 0) {
    for (const key of Object.keys(node.children)) {
      count = this.countNodes(node.children[key], count + 1);
    }
    return count;
  }

  getDictionary(node = this.root, word = '', words = []) {
    // I used 'sorted-array' rather than write an insertion sort myself
    // return Dictionary(this.Root, "", SortedArray.comparing(Compare, [])).array;
      // if we made it to a full word
  if(node.count > 0) {
    words.insert(new Candidate(word, node.count));
  }

  // recursively iterate over this path's children
  for (const key of Object.keys(node.children)) {
    const next_node = node.children[key];
    this.getDictionary(next_node, word + next_node.letter, words);
  }
  return words;
  }

  getWords(fragment) {
    // lets skip null and blank words?
    if (!fragment || fragment === "") {
      return [];
    }
    let node = this.root;
    for (const c in fragment) {
      const character = fragment[c];
      // find the deepest node we can
      if (node.children[character]) {
        node = node.children[character];
      } else {
        // if we make it down a path where there are no words
        return [];
      }
    }

    // I used 'sorted-array' rather than write an insertion sort myself
    // return this.getDictionary(node, fragment, SortedArray.comparing(Compare, [])).array;
    return this.getDictionary(node, fragment, []);
  }
}

const Compare = (entry) => {
  // bigger confidence should go first
  return -entry.confidence;
};