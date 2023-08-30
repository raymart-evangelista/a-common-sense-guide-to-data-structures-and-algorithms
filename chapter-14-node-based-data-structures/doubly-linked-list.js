class Node {
  constructor(data) {
    this.data = data
    this.next_node = null
    this.previous_node = null
  }
}

class DoublyLinkedList {
  constructor(first_node=null, last_node=null) {
    this.first_node = first_node
    this.last_node = last_node
  }
}