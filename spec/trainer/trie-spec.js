#!javascript

var Trie = require('../../src/trainer/trie');

describe('trie', () => {
  it('has one word', () => {
    const trie = new Trie();
    trie.processWord('word');
    expect(trie.countNodes()).toBe(4);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(1);
    expect(StringifiedContains({ word: 'word', count: 1 }, entries)).toBeTruthy();
  });

  it('has word twice', () => {
    const trie = new Trie();
    trie.processWord('word');
    trie.processWord('word');
    expect(trie.countNodes()).toBe(4);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(1);
    expect(StringifiedContains({ word: 'word', count: 2 }, entries)).toBeTruthy();
  });

  it('has word and wood', () => {
    const trie = new Trie();
    trie.processWord('wood');
    trie.processWord('word');
    expect(trie.countNodes()).toBe(6);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(2);
    expect(StringifiedContains({ word: 'word', count: 1 }, entries)).toBeTruthy();
    expect(StringifiedContains({ word: 'wood', count: 1 }, entries)).toBeTruthy();

    const wo_words = trie.getWords('wo');
    expect(wo_words.length).toBe(2);
    expect(StringifiedContains({ word: 'word', count: 1 }, wo_words)).toBeTruthy();
    expect(StringifiedContains({ word: 'wood', count: 1 }, wo_words)).toBeTruthy();

    const wor_words = trie.getWords('wor');
    expect(wor_words.length).toBe(1);
    expect(StringifiedContains({ word: 'word', count: 1 }, wor_words)).toBeTruthy();
  });

  it('ranking', () => {
    const trie = new Trie();
    trie.processWord('wood');
    trie.processWord('word');
    trie.processWord('word');
    trie.processWord('woot');
    trie.processWord('woot');
    trie.processWord('woot');
    expect(trie.countNodes()).toBe(7);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(3);
    const top_entry = entries[0];
    expect(top_entry.word).toMatch('woot');
    expect(top_entry.count).toMatch(3);
  });

  it('gets nothing from wood and word', () => {
    var trie = new Trie();
    trie.processWord('wood');
    trie.processWord('word');
    expect(trie.getWords('bah')).toMatch([]);
  });

  it('gets nothing from nothing', () => {
    var trie = new Trie();
    expect(trie.getWords('bah')).toMatch([]);
  });
});

const StringifiedContains = (obj, list) => {
  for (const item of list) {
    if (JSON.stringify(item) === JSON.stringify(obj)) {
      return true;
    }
  }
  return false;
}
