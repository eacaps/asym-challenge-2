# asymmetrik-challenge-2 - Mobile Device Keyboard

This is an implementation of a Mobile Device Keyboard in javascript using node.js.

## Running
Running this sample requires git and a relatively recent version of node and npm.

    $ git clone git@github.com:eacaps/asymmetrik-challenge-2.git
    $ cd asymmetrik-challenge-2
    $ npm install
    $ npm run main

The command prompt accepts the commands train, input or exit.

train: begins a prompt for a training passage  
input: begins a prompt for a fragment lookup  
exit: exits the program

## Sample output

    eacaps$ node -v
    v8.6.0
    eacaps$ npm -v
    5.3.0
    eacaps$ npm run main

    > challenge@1.0.0 main /Users/eacaps/Documents/jobs/asymmetrik/asymmetrik-challenge-2
    > node src/main.js

    prompt: [t]rain, [i]nput or [e]xit:  (exit) t
    prompt: enter a training message:  The third thing that I need to tell you is that this thing does not think thoroughly.
    train:The third thing that I need to tell you is that this thing does not think thoroughly.
    prompt: [t]rain, [i]nput or [e]xit:  (exit) i
    prompt: enter an input:  thi
    input:thi
    [ Candidate { word: 'thing', confidence: 2 },
      Candidate { word: 'third', confidence: 1 },
      Candidate { word: 'think', confidence: 1 },
      Candidate { word: 'this', confidence: 1 } ]
    prompt: [t]rain, [i]nput or [e]xit:  (exit) i
    prompt: enter an input:  nee
    input:nee
    [ Candidate { word: 'need', confidence: 1 } ]
    prompt: [t]rain, [i]nput or [e]xit:  (exit) i
    prompt: enter an input:  th
    input:th
    [ Candidate { word: 'thing', confidence: 2 },
      Candidate { word: 'that', confidence: 2 },
      Candidate { word: 'the', confidence: 1 },
      Candidate { word: 'third', confidence: 1 },
      Candidate { word: 'think', confidence: 1 },
      Candidate { word: 'this', confidence: 1 },
      Candidate { word: 'thoroughly', confidence: 1 } ]
    prompt: [t]rain, [i]nput or [e]xit:  (exit)
    good bye

## Testing
I approached this from a test driven development methodology and have a couple specs that I used to ensure the behavior was consistent. You can run the specs with the following command:

    $ npm run test

## Questions
The specifications aren't 100% percent clear when it comes to punctuation and capitalization. My interpretation from the sample input is that punctuation(.,!?) at the end of words should be stripped, this doesn't handle several potential pitfalls such as quotation marks and brackets. Additional rules would be implemented in the train method of autocompleteprovider.js. The specification also says 'you should ignore capitalization when providing suggestions' but isn't clear that training passages should be normalized to lowercase. The output from the sample('The' normalized to 'the') seemed to indicate that so I normalized everything to lower case but this may not be the intended behavior.
