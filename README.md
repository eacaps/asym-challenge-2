# asym-challenge-2 - Mobile Device Keyboard

This is an implementation of a Mobile Device Keyboard in javascript using typescript.

## Running
Running this sample requires git and a relatively recent version of node and npm.

    $ git clone git@github.com:eacaps/asym-challenge-2.git
    $ cd asym-challenge-2
    $ npm ci
    $ npm run main

The command prompt accepts the commands train, input or exit.

train: begins a prompt for a training passage  
input: begins a prompt for a fragment lookup  
exit: exits the program

## Sample output

    eacaps$ node -v
    v14.16.0
    eacaps$ npm -v
    6.14.11
    eacaps$ npm run main

    > challenge@2.0.0 main C:\Users\eacap\workspace\asym\asym-challenge-2
    > ts-node src/main.ts

    prompt: [t]rain, [i]nput or [e]xit:  (exit) t
    prompt: enter a training message:  The third thing that I need to tell you is that this thing does not think thoroughly.
    train:The third thing that I need to tell you is that this thing does not think thoroughly.
    prompt: [t]rain, [i]nput or [e]xit:  (exit) i
    prompt: enter an input:  thi
    input:thi
    [
      Candidate { word: 'thing', confidence: 2 },
      Candidate { word: 'think', confidence: 1 },
      Candidate { word: 'third', confidence: 1 },
      Candidate { word: 'this', confidence: 1 }
    ]
    prompt: [t]rain, [i]nput or [e]xit:  (exit) i
    prompt: enter an input:  nee
    input:nee
    [ Candidate { word: 'need', confidence: 1 } ]
    prompt: [t]rain, [i]nput or [e]xit:  (exit) i
    prompt: enter an input:  th
    input:th
    [
      Candidate { word: 'that', confidence: 2 },
      Candidate { word: 'thing', confidence: 2 },
      Candidate { word: 'the', confidence: 1 },
      Candidate { word: 'think', confidence: 1 },
      Candidate { word: 'third', confidence: 1 },
      Candidate { word: 'this', confidence: 1 },
      Candidate { word: 'thoroughly', confidence: 1 }
    ]
    prompt: [t]rain, [i]nput or [e]xit:  (exit)
    good bye


## Testing
I approached this from a test driven development methodology and have a couple specs that I used to ensure the behavior was consistent. You can run the specs with the following command:

    $ npm run test

