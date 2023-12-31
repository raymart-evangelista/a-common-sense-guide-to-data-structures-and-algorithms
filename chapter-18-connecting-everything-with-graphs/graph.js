import { Queue } from "./queue"

class Vertex {
  constructor(value) {
    this.value = value
    this.adjacentVertices = []
  }

  addAdjacentVertex(vertex) {
    if (this.adjacentVertices.includes(vertex)) {
      return
    }
    this.adjacentVertices.push(vertex)
    vertex.addAdjacentVertex(this)
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
      console.log(currentVertex.value)
      for (let i=0; i<currentVertex.adjacentVertices.length; i++) {
        if (!visitedVertices[currentVertex.adjacentVertices[i].value]) {
          // console.log(`inside if statement`)
          // console.log(visitedVertices)
          // console.log(`${currentVertex.adjacentVertices[i].value}`)
          visitedVertices[currentVertex.adjacentVertices[i].value] = true
          queue.enqueue(currentVertex.adjacentVertices[i])
        }
      }
    }
  }

  bfsSearch(searchValue, startingVertex=this) {
    // early exit
    if (startingVertex.value == searchValue) {
      console.log(`value found at startingVertex`)
      return startingVertex.value
    }

    let queue = new Queue()
    let visitedVertices = {}
    visitedVertices[startingVertex.value] = true
    queue.enqueue(startingVertex)

    while (queue.read()) {
      let currentVertex = queue.dequeue().data
      // return currentVertex's value if it's the searchValue
      if (currentVertex.value == searchValue) {
        console.log(`value found`)
        return currentVertex.value
      }
      for (let i=0; i<currentVertex.adjacentVertices.length; i++) {
        if (!visitedVertices[currentVertex.adjacentVertices[i].value]) {
          visitedVertices[currentVertex.adjacentVertices[i].value] = true
          queue.enqueue(currentVertex.adjacentVertices[i])
        }
      }
    }
    // ending the while loop and not returning means that the value wasn't found
    console.log('value not found')
    return null
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

// let alice = new Vertex("alice")
// let bob = new Vertex("bob")
// let cynthia = new Vertex("cynthia")
// let fred = new Vertex("fred")
// let helen = new Vertex("helen")
// let candy = new Vertex("candy")
// let derek = new Vertex("derek")

// alice.addAdjacentVertex(bob)
// alice.addAdjacentVertex(cynthia)
// bob.addAdjacentVertex(cynthia)
// cynthia.addAdjacentVertex(bob)
// bob.addAdjacentVertex(fred)
// fred.addAdjacentVertex(helen)
// alice.addAdjacentVertex(candy)
// helen.addAdjacentVertex(candy)
// alice.addAdjacentVertex(derek)


// // // alice.dfsTraverse()
// // alice.dfsSearch(alice, 'not bob')
// // alice.bfsTraverse()
// alice.bfsSearch('bob')


// // // //
// // weighted graph vertices
// // let dallas = new WeightedGraphVertex("Dallas")
// // let toronto = new WeightedGraphVertex("Toronto")
// // dallas.addAdjacentVertex(toronto, 138)
// // toronto.addAdjacentVertex(dallas, 216)

let idris = new Vertex("Idris")
let kamil = new Vertex("Kamil")
let lina = new Vertex("Lina")
let sasha = new Vertex("Sasha")
let marco = new Vertex("Marco")
let ken = new Vertex("Ken")
let talia = new Vertex("Talia")

idris.addAdjacentVertex(kamil)
idris.addAdjacentVertex(talia)
kamil.addAdjacentVertex(lina)
lina.addAdjacentVertex(sasha)
talia.addAdjacentVertex(ken)
ken.addAdjacentVertex(marco)
marco.addAdjacentVertex(sasha)
// idris.bfsTraverse()

// idris.bfsSearch('Lina')

let personsByName = {
  "Idris": idris,
  "Kamil": kamil,
  "Lina": lina,
  "Sasha": sasha,
  "Marco": marco,
  "Ken": ken,
  "Talia": talia
}

export function unweightedGraphShortestPath(startingPerson, endingPerson, persons=personsByName) {
  // does the path even exist ?
  if(!startingPerson.bfsSearch(endingPerson.value)) {
    return
  }

  // this table will contain the shortest path for a particular person
  // idris -> idris = 0
  // idris -> talia = 1
  // idris -> lina = 5 until it finds the 2
  let shortestPathsTable = {}
  // this table will be updated when the shortest path from starting person to adjacent city is the shortest we've found
  // will contain an adjacent person as key and the current person and the name
  let shortestPreviousPathTable = {}

  let unvisitedPeers = []
  let visitedPeers = {}

  shortestPathsTable[startingPerson.value] = 0

  let currentPerson = startingPerson

  while (currentPerson) {
    // { 'idris': true }
    visitedPeers[currentPerson.value] = true
    if (unvisitedPeers.includes(currentPerson.value)) {
      let index = unvisitedPeers.indexOf(currentPerson.value)
      unvisitedPeers.splice(index, 1)
    }

    for (let i=0; i<currentPerson.adjacentVertices.length; i++) {
      let adjacentPersonName = currentPerson.adjacentVertices[i].value
      if (!visitedPeers[adjacentPersonName] && !unvisitedPeers.includes(adjacentPersonName)) {
        unvisitedPeers.push(adjacentPersonName)
      }

      let degreeOfConnection = shortestPathsTable[currentPerson.value] + 1

      if (!shortestPathsTable[adjacentPersonName] || degreeOfConnection < shortestPathsTable[adjacentPersonName]) {
        shortestPathsTable[adjacentPersonName] = degreeOfConnection
        shortestPreviousPathTable[adjacentPersonName] = currentPerson.value
      }
    }
    
    currentPerson = persons[unvisitedPeers.pop()]
  }

  let shortestDegreeOfConnection = []
  let currentPersonName = endingPerson.value
  while (currentPersonName != startingPerson.value) {
    shortestDegreeOfConnection.push(currentPersonName)
    currentPersonName = shortestPreviousPathTable[currentPersonName]
  }
  shortestDegreeOfConnection.push(startingPerson.value)

  // return array containing precise path e.g.: ["Idris", "Kamil", "Lina"]
  return shortestDegreeOfConnection.reverse()
}

console.log(unweightedGraphShortestPath(idris, lina))

