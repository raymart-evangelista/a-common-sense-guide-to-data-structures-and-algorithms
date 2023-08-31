class Node {
  constructor(data) {
    this.data = data
    this.next_node = null
  }
}

// usage
node1 = new Node("once")
node2 = new Node("upon")
node3 = new Node("a")
node4 = new Node("time")

node1.next_node = node2
node2.next_node = node3
// node3.next_node(node4) this doesn't work because next_node isn't a function
node3.next_node = node4

node5 = new Node("beautiful")
node4.next_node = node5

// console.log(node3.next_node)


class LinkedList {
  constructor(first_node) {
    this.first_node = first_node
  }

  read_data(index) {
    let current_node = this.first_node
    for (let current_index = 0; current_index < index; current_index++) {
      current_node = current_node.next_node
    }
    return current_node.data
  }

  search_data(value) {
    let current_node = this.first_node
    let found = false
    let index = 0

    while (found == false) {
      if (current_node == null) {
        index = null
        break;
      }

      if (current_node.data == value) {
        found = true
      } else {
        index++
        current_node = current_node.next_node
      }
    }
    return index
  }

  insert_at_index(value, index) {
    let new_node = new Node(value)

    
    // case when inserting at start
    if (index == 0) {
      // old first_node is now the second node
      new_node.next_node = this.first_node
      // reestablish what the new first_node in the linked list is
      this.first_node = new_node
      return
    }

    // case when inserting at middle + end
    let previous_node = this.first_node
    for (let current_index = 0; current_index < index - 1; current_index++) {
      previous_node = previous_node.next_node
    }
    // new_node's next node will be previous_node's old next_node
    new_node.next_node = previous_node.next_node
    // previous_node.next_node will now point to new_node
    previous_node.next_node = new_node
    
  }

  delete_at_index(index) {
    // case when first_node
    if (index == 0) {
      this.first_node = this.first_node.next_node
      return
    }
    // case when last node or middle
    let previous_node = this.first_node
    for (let current_index = 0; current_index < index - 1; current_index) {
      previous_node = previous_node.next_node
    }

    let node_after_node_to_delete = previous_node.next_node.next_node
    // point previous_node.next_node to node_after_node_to_delete
    previous_node.next_node = node_after_node_to_delete
    return
  }

  print_all() {
    let current_node = this.first_node

    while (current_node) {
      console.log(current_node.data)
      current_node = current_node.next_node
    }
  }
  print_last_element() {
    let current_node = this.first_node
    while (current_node.next_node) {
      current_node = current_node.next_node
    }
    console.log(current_node.data)
  }
}

const list = new LinkedList(node1)
// console.log(list.read_data(4))
// console.log(list.search_data('tisme'))
// console.log(list.read_data(0))
// list.print_all()
list.print_last_element()
// list.insert_at_index(3, 0)
// console.log(list.read_data(0))