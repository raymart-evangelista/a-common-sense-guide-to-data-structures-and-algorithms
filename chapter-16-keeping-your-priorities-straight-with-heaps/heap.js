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
}