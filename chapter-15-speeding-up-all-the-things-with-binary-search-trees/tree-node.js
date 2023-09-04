class TreeNode {
  constructor(value, left=null, right=null) {
    this.value = value
    this.leftChild = left
    this.rightChild = right
  }
}

node1 = new TreeNode(25)
node2 = new TreeNode(75)
root = new TreeNode(50, node1, node2)

class BinarySearchTree {
  constructor(root=null) {
    this.root = root
  }
  search(searchValue, currentNode=this.root) {
    if (currentNode === null || currentNode.value === searchValue) {
      return currentNode
    }

    if (currentNode.value < searchValue) {
      return this.search(searchValue, currentNode.rightChild)
    }

    if (currentNode.value > searchValue) {
      return this.search(searchValue, currentNode.leftChild)
    }
  }
}