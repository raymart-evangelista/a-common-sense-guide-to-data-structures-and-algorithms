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
      // console.log(currentNode)
      for (let [key, childNode] of Object.entries(currentNode.children)) {
        console.log(key)
        this.traverse(childNode)
        // console.log(childNode)
      }
    }
  }

  autocorrect(text) {
    // if the text isn't in the trie, return an alternative word that shares the largest possible prefix
    if (!this.search(text)) {
      // take typo and replace with correct work catnar -> catnap

      
      // the entire word cannot be found so see if prefix exists
      
      for (let i=0; i<text.length; i++) {
        if (this.search(text.slice(0, text.length - i))) {
          // to enter here, a portion of first part of the text should exist
          // so we can tag on the rest of the word to the current word and return
          let prefix = text.slice(0, text.length - i)
          let currentNode = this.search(prefix)
          
          // if the output says the current prefix is already a word, return just prefix
          if (currentNode) {
            let possibleWords = this.collectAllWords(currentNode, prefix)
            if (possibleWords.length > 0) {
              return possibleWords[0]
            }
          }
        }
      }
    } else {
      return text
    }
  }
}

let trie = new Trie()
// trie.insert('cat')
trie.insert('catnap')
trie.insert('catnip')
trie.insert('word')
trie.insert('another')
// console.log(trie.collectAllWords())
// console.log(trie.autocomplete('wo'))
// console.log(trie.traverse())

// trie.traverse()
// console.log(trie.search('word'))


// should return 'catnap'
console.log(trie.autocorrect('catnar'))
console.log(trie.autocorrect('catnar'))

// // returns cat, catnap, or catnip
console.log(trie.autocorrect("catttttxssasfdij"))

// these two console logs should return 'word'
console.log(trie.autocorrect('word'))
console.log(trie.autocorrect('wordddd'))

// this word should return 'another'
console.log(trie.autocorrect('another'))