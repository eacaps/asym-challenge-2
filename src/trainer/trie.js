var SortedArray = require('sorted-array');
var Candidate = require('./candidate');

// Data node for the tree structure
class Node {
  constructor(letter) {
    this.letter = letter;
    this.count = 0;
    this.children = {};
  }
}

const ProcessWord = (string, node) => {
  const letter = string[0];
  let next_node = null;
  // if we already have a word that follows this path
  if(node.children[letter]) {
    next_node = node.children[letter];
  } else {
    // if we're going down a new path
    next_node = new Node(letter);
    node.children[letter] = next_node;
  }
  // if we're at the end of a word
  if(string.length == 1) {
    next_node.count++;
  }
  // if there are still letters to process
  if(string.length > 1) {
    const rest = string.slice(1);
    ProcessWord(rest, next_node);
  }
};

// recursively count the number of nodes in the entire tree(depth first?)
const Count = (node, count) => {
  for (const key of Object.keys(node.children)) {
    count = Count(node.children[key], count + 1);
  }
  return count;
};

/*
  starting at the given node, and the word processed so far, return
  the list of possible future words
*/
const Dictionary = (node, word, words) => {
  // if we made it to a full word
  if(node.count > 0) {
    words.insert(new Candidate(word, node.count));
  }

  // recursively iterate over this path's children
  for (const key of Object.keys(node.children)) {
    const next_node = node.children[key];
    Dictionary(next_node, word + next_node.letter, words);
  }
  return words;
};

class Trie {
  constructor() {
    this.Root = new Node(null);
  }
  processWord(word) {
    ProcessWord(word, this.Root);
  }
  countNodes() {
    return Count(this.Root, 0);
  }
  getDictionary() {
    // I used 'sorted-array' rather than write an insertion sort myself
    return Dictionary(this.Root, '', SortedArray.comparing(Compare, [])).array;
  }
  getWords(fragment) {
    // lets skip null and blank words?
    if(!fragment || fragment === '') {
      return [];
    }
    let node = this.Root;
    for(const c in fragment) {
      const character = fragment[c];
      // find the deepest node we can
      if(node.children[character]) {
        node = node.children[character];
      } else {
        // if we make it down a path where there are no words
        return [];
      }
    }

    // I used 'sorted-array' rather than write an insertion sort myself
    return Dictionary(node, fragment, SortedArray.comparing(Compare, [])).array;
  }
}

const Compare = (entry) => {
  // bigger confidence should go first
  return -entry.confidence;
};

module.exports = Trie;
