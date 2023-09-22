class City {
  constructor(name) {
    this.name = name
    this.routes = {}
  }

  addRoute(city, price) {
    this.routes[city] = price
  }
}