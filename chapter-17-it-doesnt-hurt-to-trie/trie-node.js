class TrieNode {
  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  /**
   * 
   * @param {TrieNode} [currentNode=this.root] - starting node for the search 
   * @param {string} word - word to search for 
   * @returns {boolean} - True if the word exists in the Trie, otherwise false
   */
  search(currentNode=this.root, word) {
    for (let i=0; i<word.length; i++) {
       let character = word[i]
       if (character in currentNode.children) {
        currentNode = currentNode.children[character]
       } else {
        return false
       }
    }
    return currentNode.isEndOfWord
  }

  insert(currentNode=this.root, word) {
    for (let i=0; i<word.length; i++) {
      let character = word[i]
      if (character in currentNode.children) {
        currentNode = currentNode.children[character]
      } else {
        currentNode.children[character] = new TrieNode()
        currentNode = currentNode.children[character]
      }
    }
    currentNode.isEndOfWord = true
  }

  collectAllWords(node, word="", words=[]) {
    let currentNode = node || this.root

    if (currentNode.isEndOfWord) {
      words.push(word)
    }
    
    for (let [character, childNode] of Object.entries(currentNode.children)) {
      this.collectAllWords(childNode, word + character, words)
    }
    return words
  }
}