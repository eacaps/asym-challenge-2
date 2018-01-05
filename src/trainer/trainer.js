var Trie = require('./trie');
let trie = new Trie();

class Trainer {
  constructor() {
  }
  train(passage) {
    const words = passage.split(' ');
    for (const word of words) {
      const stripped_word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      trie.processWord(stripped_word);
    }
  }
  getWords(fragment) {
    return trie.getWords(fragment);
  }
}

module.exports = Trainer;
