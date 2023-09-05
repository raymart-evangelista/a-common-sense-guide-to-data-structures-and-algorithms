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
  insert(value, currentNode=this.root) {
    // do something when the tree is empty
    if (!this.root) {
      this.root = new TreeNode(value)
      return
    }
    // traverse left side of tree
    if (value < currentNode.value) {
      if (currentNode.leftChild) {
        this.insert(value, currentNode.leftChild)
      } else {
        currentNode.leftChild = new TreeNode(value)
        return
      }
    }
    // traverse right side of tree
    if (value > currentNode.value) {
      if (currentNode.rightChild) {
        this.insert(value, currentNode.rightChild)
      } else {
        currentNode.rightChild = new TreeNode(value)
        return
      }
    }
  }
  delete(valueToDelete, currentNode=this.root) {
    // if node doesn't exist
    if (!currentNode) {
      return null
    }

    if (valueToDelete < currentNode.value) {
      currentNode.leftChild = this.delete(valueToDelete, currentNode.leftChild)
      return currentNode
    }

    if (valueToDelete > currentNode.value) {
      currentNode.rightChild = this.delete(valueToDelete, currentNode.rightChild)
      return currentNode
    }

    if (valueToDelete == currentNode.value) {
      // main guts of the program

      // case 1: valueToDelete doesn't have any subchildren / only one sub child
      if (!currentNode.leftChild) {
        return currentNode.rightChild
      }
      if (!currentNode.rightChild) {
        return currentNode.leftChild
      }

      // case 2: valueToDelete has two subchildren so we 
      // delete currentNode thru lift function which changes
      // current node's value to value of successor
      currentNode.rightChild= this.lift(currentNode.rightChild, currentNode)
    }
    return currentNode

  }

  lift(currentNode, nodeToDelete) {
    if (currentNode.leftChild) {
      currentNode.leftChild = this.lift(currentNode.leftChild, nodeToDelete)
      return currentNode
    } else {
      nodeToDelete.value = currentNode.value
      return currentNode.rightChild
    }
  }

  traverse_and_print_inorder(currentNode=this.root) {
    if (!currentNode) {
      return
    } else {
      this.traverse_and_print(currentNode.leftChild)
      console.log(currentNode.value)
      this.traverse_and_print(currentNode.rightChild)
    }
  }
  traverse_and_print_preorder(currentNode=this.root) {
    if (!currentNode) {
      return
    } else {
      console.log(currentNode.value)
      this.traverse_and_print_preorder(currentNode.leftChild)
      this.traverse_and_print_preorder(currentNode.rightChild)
    }
  }
  traverse_and_print_postorder(currentNode=this.root) {
    if (!currentNode) {
      return
    } else {
      this.traverse_and_print_postorder(currentNode.leftChild)
      this.traverse_and_print_postorder(currentNode.rightChild)
      console.log(currentNode.value)
    }
  }
}