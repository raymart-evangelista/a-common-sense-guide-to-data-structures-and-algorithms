import { Queue } from "../chapter-14-node-based-data-structures/doubly-linked-list"

class Vertex {
  constructor(value) {
    this.value = value
    this.adjacentVertices = []
  }

  addAdjacentVertex(vertex) {
    this.adjacentVertices.push(vertex)
  }

  dfsTraverse(vertex=this, visitedVertices={}) {
    visitedVertices[vertex.value] = true
    console.log(vertex.value)

    for (let i=0; i<vertex.adjacentVertices.length; i++) {
      if (visitedVertices[vertex.adjacentVertices[i].value]) {
        continue
      } else {
        this.dfsTraverse(vertex.adjacentVertices[i], visitedVertices)
      }
    }
  }

  dfsSearch(vertex=this, searchValue, visitedVertices={}) {
    if (vertex.value == searchValue) {
      console.log(`value found and in this if statement`)
      return vertex
    }
    visitedVertices[vertex.value] = true

    for (let i=0; i<vertex.adjacentVertices.length; i++) {
      if (visitedVertices[vertex.adjacentVertices[i].value]) {
        continue
      } else {
        if (vertex.adjacentVertices[i].value == searchValue) {
          console.log(`value found and in this other if statement`)
          return vertex.adjacentVertices[i] 
        }
        let vertexSearchingFor = this.dfsSearch(vertex.adjacentVertices[i], searchValue, visitedVertices)

        if (vertexSearchingFor) {
          console.log(`value found: ${vertexSearchingFor}`)
          return vertexSearchingFor
        } else {
          console.log(`value not found`)
          return null
        }
      }
    }
  }

  bfsTraverse(startingVertex=this) {
    let queue = new Queue()

    let visitedVertices = {}
    visitedVertices[startingVertex.value] = true
    queue.enqueue(startingVertex)

    while (queue.read) {
      let currentVertex = queue.dequeue()

      console.log(currentVertex.value)
    }
  }
}

let alice = new Vertex("alice")
let bob = new Vertex("bob")
let cynthia = new Vertex("cynthia")
let fred = new Vertex("fred")
let helen = new Vertex("helen")
let candy = new Vertex("candy")
let derek = new Vertex("derek")

alice.addAdjacentVertex(bob)
alice.addAdjacentVertex(cynthia)
bob.addAdjacentVertex(cynthia)
cynthia.addAdjacentVertex(bob)
bob.addAdjacentVertex(fred)
fred.addAdjacentVertex(helen)
alice.addAdjacentVertex(candy)
helen.addAdjacentVertex(candy)
alice.addAdjacentVertex(derek)


// alice.dfsTraverse()
alice.dfsSearch(alice, 'not bob')
