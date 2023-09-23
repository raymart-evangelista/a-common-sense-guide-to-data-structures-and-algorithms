import { Queue } from "./queue"

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


    while (queue.read()) {
      let currentVertex = queue.dequeue().data
      for (let i=0; i<currentVertex.adjacentVertices.length; i++) {
        if (!visitedVertices[currentVertex.adjacentVertices[i].value]) {
          console.log(`inside if statement`)
          console.log(visitedVertices)
          console.log(`${currentVertex.adjacentVertices[i].value}`)
          visitedVertices[currentVertex.adjacentVertices[i].value] = true
          queue.enqueue(currentVertex.adjacentVertices[i])
        }
      }
    }
  }

  bfsSearch(searchValue, startingVertex=this) {
    if (startingVertex.value == searchValue) {
      console.log(`value found at startingVertex`)
      return startingVertex.value
    }

    let queue = new Queue()
    let visitedVertices = {}
    visitedVertices[startingVertex.value] = true
    queue.enqueue(startingVertex)

    while (queue.read() != null) {
      let currentVertex = queue.dequeue()

      for(let i=0; i<currentVertex.adjacentVertices.length; i++) {
        if (currentVertex.adjacentVertices[i].value == searchValue) {
          return currentVertex.adjacentVertices[i].value
        }
        if (!visitedVertices[currentVertex.adjacentVertices[i].value]) {
          visitedVertices[currentVertex.adjacentVertices[i]] = true
          queue.enqueue(currentVertex.adjacentVertices[i])
        }
      }
    }

  }
}

class WeightedGraphVertex {
  constructor(value) {
    this.value = value
    this.adjacentVertices = {}
  }

  addAdjacentVertex(vertex, weight) {
    this.adjacentVertices[vertex] = weight
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


// // alice.dfsTraverse()
// alice.dfsSearch(alice, 'not bob')
alice.bfsTraverse()


// // //
// weighted graph vertices
// let dallas = new WeightedGraphVertex("Dallas")
// let toronto = new WeightedGraphVertex("Toronto")
// dallas.addAdjacentVertex(toronto, 138)
// toronto.addAdjacentVertex(dallas, 216)