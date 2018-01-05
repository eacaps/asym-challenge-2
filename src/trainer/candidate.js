class Candidate {
  constructor(word, confidence) {
    this.word = word;
    this.confidence = confidence;
  }
  getWord() {
    return this.word;
  }
  getConfidence() {
    return this.confidence;
  }
}

module.exports = Candidate;
