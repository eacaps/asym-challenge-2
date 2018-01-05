#!javascript
var AutocompleteProvider = require('../../src/trainer/autocompleteprovider');
var SpecHelper = require('./spec-helper.js');

describe('trainer', () => {
  it('have correct methods', () => {
    var trainer = new AutocompleteProvider();
    expect(typeof trainer.train).toMatch('function');
    expect(typeof trainer.getWords).toMatch('function');
  });

  it('does hello world correctly', () => {
    var trainer = new AutocompleteProvider();
    trainer.train('Hello World.');
    const Hell_result = trainer.getWords('Hell');
    expect(Hell_result.length).toBe(1);
    const hell_result = trainer.getWords('hell');
    expect(hell_result.length).toBe(1);
    const no_result = trainer.getWords('no');
    expect(no_result.length).toBe(0);
  });

  it('handles weird stuff', () => {
    var trainer = new AutocompleteProvider();
    trainer.train('Hel@lo.com %%%%% Wo    rld.');
    const hello_result = trainer.getWords('he');
    expect(hello_result.length).toBe(1);
    const world_result = trainer.getWords('world');
    expect(world_result.length).toBe(0);
    const no_result = trainer.getWords('');
    expect(no_result.length).toBe(0);
  });

  it('tests sample', () => {
    let trainer = new AutocompleteProvider();
    trainer.train('The third thing that I need to tell you is that this thing does not think thoroughly.');

    const thi_result = trainer.getWords('thi');
    console.log(thi_result);
    // "thing" (2), "think" (1), "third" (1), "this" (1)
    expect(thi_result.length).toBe(4);
    const top_thi_result = thi_result[0];
    expect(top_thi_result.getWord()).toMatch('thing');
    expect(top_thi_result.getConfidence()).toBe(2);
    expect(SpecHelper.StringifiedContains({word: 'think', confidence: 1}, thi_result));
    expect(SpecHelper.StringifiedContains({word: 'third', confidence: 1}, thi_result));
    expect(SpecHelper.StringifiedContains({word: 'this', confidence: 1}, thi_result));

    const nee_result = trainer.getWords('nee');
    console.log(nee_result);
    // "need" (1)
    expect(nee_result.length).toBe(1);
    const top_nee_result = nee_result[0];
    expect(top_nee_result.getWord()).toMatch('need');
    expect(top_nee_result.getConfidence()).toBe(1);

    const th_result = trainer.getWords('th');
    console.log(th_result);
    // "that" (2), "thing" (2), "think" (1), "this" (1), "third" (1), "the" (1), "thoroughly" (1)
    expect(th_result.length).toBe(7);
    expect(SpecHelper.StringifiedContains({word: 'that', confidence: 2}, th_result));
    expect(SpecHelper.StringifiedContains({word: 'thing', confidence: 2}, th_result));
    expect(SpecHelper.StringifiedContains({word: 'think', confidence: 1}, th_result));
    expect(SpecHelper.StringifiedContains({word: 'this', confidence: 1}, th_result));
    expect(SpecHelper.StringifiedContains({word: 'third', confidence: 1}, th_result));
    expect(SpecHelper.StringifiedContains({word: 'the', confidence: 1}, th_result));
    expect(SpecHelper.StringifiedContains({word: 'thoroughly', confidence: 1}, th_result));
  });
});
