export default class Candidate {
    readonly word:string;
    readonly confidence: number;
    constructor(word, confidence) {
      this.word = word;
      this.confidence = confidence;
    }
  }
  
  