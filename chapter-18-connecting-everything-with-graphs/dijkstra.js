class City {
  constructor(name) {
    this.name = name
    this.routes = {}
  }

  addRoute(city, price) {
    this.routes[city] = price
  }
}



let atlanta = new City("Atlanta")
let boston = new City("Boston")
let chicago = new City("Chicago")
let denver = new City("Denver")
let elPaso = new City("El Paso")

atlanta.addRoute(boston, 100)
atlanta.addRoute(denver, 160)
boston.addRoute(chicago, 120)
boston.addRoute(denver, 180)
chicago.addRoute(elPaso, 80)
denver.addRoute(chicago, 40)
denver.addRoute(elPaso, 140)