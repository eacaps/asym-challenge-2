var prompt = require('prompt');

var train_pattern = '^t[rain]?';
var input_pattern = '^i[nput]?';
var exit_pattern = '^e[xit]?';

var prompt_validator = new RegExp(train_pattern + '|' + input_pattern + '|' + exit_pattern);
var train_validator = new RegExp(train_pattern);
var input_validator = new RegExp(input_pattern);

var prompt_properties = {
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
        return train_validator.test(prompt.history('main_prompt').value);
      }
    },
    input_prompt: {
      name: 'input_prompt',
      message: 'enter an input',
      ask: function() {
        return input_validator.test(prompt.history('main_prompt').value);
      }
    }
  }
};

function run_prompt() {
  prompt.start();

  prompt.get(prompt_properties, function (err, result) {
    if(result.train_prompt) {
      console.log('train:' + result.train_prompt);
    } else if(result.input_prompt) {
      console.log('input:' + result.input_prompt);
    } else {
      console.log('good bye');
      process.exit();
    }
    run_prompt();
  });
}

run_prompt();
