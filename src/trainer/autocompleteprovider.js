var Trie = require('./trie');

class Trainer {
  constructor() {
    this.trie = new Trie();
  }
  train(passage) {
    const words = passage.split(' ');
    for (const word of words) {
      const stripped_word = word.replace(/[.,!?]$/g, '').toLowerCase();
      this.trie.processWord(stripped_word);
    }
  }
  getWords(fragment) {
    return this.trie.getWords(fragment.toLowerCase());
  }
}

module.exports = Trainer;
