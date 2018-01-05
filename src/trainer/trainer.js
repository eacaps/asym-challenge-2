var Trie = require('./trie');
let trie = new Trie();

class Trainer {
  constructor() {
  }
  train(passage) {
    const words = passage.split(' ');
    for (const word of words) {
      trie.processWord(word);
    }
  }
  getWords(fragment) {
    return trie.getWords(fragment);
  }
}

module.exports = Trainer;
