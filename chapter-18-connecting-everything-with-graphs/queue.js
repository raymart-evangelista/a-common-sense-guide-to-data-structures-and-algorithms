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

  insert_at_end(value) {
    let new_node = new Node(value)
    // if there are no nodes
    if (!this.first_node) {
      this.first_node = new_node
      this.last_node = new_node
    } else {
      // last node's next_node is the new_node
      this.last_node.next_node = new_node
      // the new_node's previous_node will be the current last_node
      new_node.previous_node = this.last_node
      // the new_node becomes the last_node
      this.last_node = new_node
    }
  }

  remove_from_front() {
    let removed_node = this.first_node
    this.first_node = this.first_node.next_node

    return removed_node
  }

  print_forward() {
    let current_node = this.first_node
    while (current_node) {
      console.log(current_node.data)
      current_node = current_node.next_node
    }
  }
  print_backward() {
    let current_node = this.last_node
    while(current_node) {
      console.log(current_node.data)
      current_node = current_node.previous_node
    }
  }
}

class Queue {
  constructor() {
    this.data = new DoublyLinkedList()
  }

  enqueue(element) {
    this.data.insert_at_end(element)
  }

  dequeue() {
    let removed_node = this.data.remove_from_front()
    return removed_node
  }

  read() {
    if (this.data.first_node) {
      return this.data.first_node.data
    }
  }
}

export { Queue }