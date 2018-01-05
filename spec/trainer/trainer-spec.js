#!javascript

var Trainer = require('../../src/trainer/trainer');

describe('trainer', () => {
  it('have correct methods', () => {
    var trainer = new Trainer();
    expect(typeof trainer.train).toMatch('function');
    expect(typeof trainer.getWords).toMatch('function');
  });

  it('tests sample', () => {
    let trainer = new Trainer();
    trainer.train('The third thing that I need to tell you is that this thing does not think thoroughly.');
    console.log(trainer.getWords('thi'));
    console.log(trainer.getWords('nee'));
    console.log(trainer.getWords('th'));
  });
});
