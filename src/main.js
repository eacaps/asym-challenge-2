var Prompt = require('prompt');
var AutocompleteProvider = require('./trainer/autocompleteprovider');

const trainer = new AutocompleteProvider();

const train_pattern = '^t[rain]?';
const input_pattern = '^i[nput]?';
const exit_pattern = '^e[xit]?';

const prompt_validator = new RegExp(train_pattern + '|' + input_pattern + '|' + exit_pattern);
const train_validator = new RegExp(train_pattern);
const input_validator = new RegExp(input_pattern);

const prompt_properties = {
  properties: {
    main_prompt: {
      name: 'main_prompt',
      message: '[t]rain, [i]nput or [e]xit',
      validator: prompt_validator,
      warning: 'invalid command',
      default: 'exit'
    },
    train_prompt: {
      name: 'train_prompt',
      message: 'enter a training message',
      ask: function() {
        return train_validator.test(Prompt.history('main_prompt').value);
      }
    },
    input_prompt: {
      name: 'input_prompt',
      message: 'enter an input',
      ask: () => {
        return input_validator.test(Prompt.history('main_prompt').value);
      }
    }
  }
};

const run_prompt = () => {
  Prompt.start();

  Prompt.get(prompt_properties, function (err, result) {
    if(result.train_prompt) {
      console.log('train:' + result.train_prompt);
      trainer.train(result.train_prompt);
    } else if(result.input_prompt) {
      console.log('input:' + result.input_prompt);
      console.log(trainer.getWords(result.input_prompt));
    } else {
      console.log('good bye');
      process.exit();
    }
    run_prompt();
  });
}

run_prompt();
