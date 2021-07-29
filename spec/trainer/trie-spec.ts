#!javascript
import Trie from "../../src/trainer/trie";
import { StringifiedContains } from "./spec-helper";

describe("trie", () => {
  it("has one word", () => {
    const trie = new Trie();
    trie.processWord("word");
    expect(trie.countNodes()).toBe(4);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(1);
    expect(
      StringifiedContains({ word: "word", confidence: 1 }, entries)
    ).toBeTruthy();
  });

  it("has word twice", () => {
    const trie = new Trie();
    trie.processWord("word");
    trie.processWord("word");
    expect(trie.countNodes()).toBe(4);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(1);
    expect(
      StringifiedContains({ word: "word", confidence: 2 }, entries)
    ).toBeTruthy();
  });

  it("has word and wood", () => {
    const trie = new Trie();
    trie.processWord("wood");
    trie.processWord("word");
    expect(trie.countNodes()).toBe(6);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(2);
    expect(
      StringifiedContains({ word: "word", confidence: 1 }, entries)
    ).toBeTruthy();
    expect(
      StringifiedContains({ word: "wood", confidence: 1 }, entries)
    ).toBeTruthy();

    const wo_words = trie.getWords("wo");
    expect(wo_words.length).toBe(2);
    expect(
      StringifiedContains({ word: "word", confidence: 1 }, wo_words)
    ).toBeTruthy();
    expect(
      StringifiedContains({ word: "wood", confidence: 1 }, wo_words)
    ).toBeTruthy();

    const wor_words = trie.getWords("wor");
    expect(wor_words.length).toBe(1);
    expect(
      StringifiedContains({ word: "word", confidence: 1 }, wor_words)
    ).toBeTruthy();
  });

  it("has woo and wood", () => {
    const trie = new Trie();
    trie.processWord("woo");
    trie.processWord("wood");
    expect(trie.countNodes()).toBe(4);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(2);
    expect(
      StringifiedContains({ word: "woo", confidence: 1 }, entries)
    ).toBeTruthy();
    const woo_words = trie.getWords("woo");
    expect(woo_words.length).toBe(2);
  });

  it("ranking", () => {
    const trie = new Trie();
    trie.processWord("wood");
    trie.processWord("word");
    trie.processWord("word");
    trie.processWord("woot");
    trie.processWord("woot");
    trie.processWord("woot");
    trie.processWord("woof");
    expect(trie.countNodes()).toBe(8);
    const entries = trie.getDictionary();
    expect(entries.length).toBe(4);
    const top_entry = entries[0];
    expect(top_entry.word).toMatch("woot");
    expect(top_entry.confidence).toBe(3);
    const bottom_entry = entries[2];
    expect(bottom_entry.word).toMatch("wood");
    expect(bottom_entry.confidence).toBe(1);
  });

  it("gets nothing from wood and word", () => {
    var trie = new Trie();
    trie.processWord("wood");
    trie.processWord("word");
    expect(trie.getWords("bah")).toEqual([]);
  });

  it("gets nothing from nothing", () => {
    var trie = new Trie();
    expect(trie.getWords("bah")).toEqual([]);
  });
});
