class Heap {
  constructor() {
    this.data = []
  }
  rootNode() {
    return this.data[0]
  }
  lastNode() {
    return this.data[this.data.length - 1]
  }

  getLeftChildIndex(index) {
    return (index * 2) + 1
  }

  getRightChildIndex(index) {
    return (index * 2) + 2
  }

  getParentIndex(index) {
    return (index - 1) / 2
  }
  insert(value) {
    // insert value into the rightmost spot in bottom level
    // (in array data structure, that's the last value in array)
    this.data.push(value)
    let newNodeIndex = this.data.length - 1

    // compare value with parent--while the new value is greater than its parent, swap
    while (newNodeIndex > 0 && this.data[newNodeIndex] > this.data[this.getParentIndex(newNodeIndex)]) {
      this.data[this.getParentIndex(newNodeIndex)], this.data[newNodeIndex] = this.data[newNodeIndex], this.data[this.getParentIndex(newNodeIndex)]
      newNodeIndex = this.getParentIndex(newNodeIndex)
    } 
  }
  delete(value) {
    this.data[0] = this.data.pop

    trickleNodeIndex = 0
    while (this.hasGreaterChild(trickleNodeIndex)) {
      largerChildIndex = this.calculateLargerChildIndex(trickleNodeIndex)

      this.data[trickleNodeIndex], this.data[largerChildIndex] = this.data[largerChildIndex], this.data[trickleNodeIndex]

      trickleNodeIndex = largerChildIndex
    }
  }
  hasGreaterChild(index) {

  }
  calculateLargerChildIndex(index) {

  }
}