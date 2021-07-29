export default class TrieNode {
    readonly letter?: string;
    readonly count = 0;
    readonly children = new Map<string,TrieNode>();

    constructor(letter?:string) {
        this.letter = letter;
    }
}