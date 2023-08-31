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

let node1 = new Node('once')
let node2 = new Node('upon')
let node3 = new Node('a')
let node4 = new Node('time')

node1.next_node = node2
node2.next_node = node3
node3.next_node = node4

node4.previous_node = node3
node3.previous_node = node2
node2.previous_node = node1

let doubly = new DoublyLinkedList(node1, node4)

// doubly.print_forward()
doubly.print_backward()