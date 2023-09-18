class Vertex {
  constructor(value) {
    this.value = value
    this.adjacentVertices = []
  }

  addAdjacentVertex(vertex) {
    this.adjacentVertices.push(vertex)
  }
}