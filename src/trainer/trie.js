var SortedArray = require('sorted-array');
var Candidate = require('./candidate');

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
  if(node.children[letter]) {
    next_node = node.children[letter];
    if(string.length == 1) {
      next_node.count++;
    }
  } else {
    next_node = new Node(letter);
    node.children[letter] = next_node;
    if(string.length == 1) {
      next_node.count++;
    }
  }
  if(string.length > 1) {
    const rest = string.slice(1);
    ProcessWord(rest, next_node);
  }
};

const Count = (node, count) => {
  for (const key of Object.keys(node.children)) {
    count = Count(node.children[key], count + 1);
  }
  return count;
};

const Dictionary = (node, word, words) => {
  if(node.count > 0) {
    words.insert(new Candidate(word, node.count));
  }

  for (const key of Object.keys(node.children)) {
    const next_node = node.children[key];
    Dictionary(next_node, word + next_node.letter, words);
  }
  return words;
};

const Words = (node, words) => {
  for (const key of Object.keys(node.children)) {
    Dictionary(node.children[key], word, words);
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
    return Dictionary(this.Root, '', SortedArray.comparing(Compare, [])).array;
  }
  getWords(fragment) {
    if(!fragment || fragment === '') {
      return [];
    }
    let node = this.Root;
    for(const c in fragment) {
      const character = fragment[c];
      if(node.children[character]) {
        node = node.children[character];
      } else {
        return [];
      }
    }

    return Dictionary(node, fragment, SortedArray.comparing(Compare, [])).array;
  }
}

const Compare = (entry) => {
  return -entry.confidence;
};

module.exports = Trie;
