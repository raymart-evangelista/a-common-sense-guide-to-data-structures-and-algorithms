class TrieNode {
  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
    console.log(`new trie created`)
  }

  /**
   * 
   * @param {TrieNode} [currentNode=this.root] - starting node for the search 
   * @param {string} word - word to search for 
   * @returns {boolean} - True if the word exists in the Trie, otherwise false
   */
  search(word, currentNode=this.root) {
    for (let i=0; i<word.length; i++) {
       let character = word[i]
       if (character in currentNode.children) {
        currentNode = currentNode.children[character]
       } else {
        return false
       }
    }
    return currentNode
  }

  insert(word, currentNode=this.root) {
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
    console.log(`new word inserted`)
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

  autocomplete(prefix) {
    let currentNode = this.search(prefix)
    if (!currentNode) {
      return null
    }
    return this.collectAllWords(currentNode)
  }

  traverse(currentNode=this.root) {
    if (!currentNode) {
      return
    } else {
      for (let [character, childNode] of Object.entries(currentNode.children)) {

      }
    }
  }
}

let trie = new Trie()
trie.insert('word')
trie.insert('another')
trie.insert('work')
// console.log(trie.collectAllWords())
console.log(trie.autocomplete('wo'))