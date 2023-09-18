class Vertex {
  constructor(value) {
    this.value = value
    this.adjacentVertices = []
  }

  addAdjacentVertex(vertex) {
    this.adjacentVertices.push(vertex)
  }
  dfs(vertex=this, visitedVertices={}) {
    visitedVertices[vertex.value] = true
    console.log(vertex.value)

    for (let i=0; i<vertex.adjacentVertices.length; i++) {
      if (visitedVertices[vertex.adjacentVertices[i].value]) {
        continue
      } else {
        this.dfs(vertex.adjacentVertices[i], visitedVertices)
      }
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


alice.dfs()
