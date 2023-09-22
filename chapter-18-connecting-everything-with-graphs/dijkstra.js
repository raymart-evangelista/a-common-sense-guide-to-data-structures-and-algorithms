// https://youtu.be/EFg3u_E6eHU

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

export function dijkstraShortestPath(startingCity, finalDestination) {
  let cheapestPricesTable = {}
  let cheapestPreviousStopoverCityTable = {}

  let unvisitedCities = []
  let visitedCities = {}
  
  cheapestPricesTable[startingCity.name] = 0
  
  let currentCity = startingCity
  // loop runs as long as we can visit a city  we haven't visited yet
  while (currentCity) {
    visitedCities[currentCity.name] = true
    unvisitedCities = unvisitedCities.filter(city => city.name !== currentCity.name)
    
    // iterate over each of the currentCity's adjacent cities
    for (const adjacentCity in currentCity.routes) {
      // if discovered a new city, add it to list of unvisited cities
      if (!visitedCities[adjacentCity.name]) {
        unvisitedCities.push(adjacentCity)
      }
      // calculate price of getting from starting city to adjacent city using current city as second-to-last stop
      let priceThroughCurrentCity = cheapestPricesTable[currentCity.name] + price

      // if the price from starting city to adjacent city is the cheapest one we found so far...
      if (!cheapestPricesTable[adjacentCity.name] || priceThroughCurrentCity < cheapestPricesTable[adjacentCity.name]) {
        // ...update two tables:
        cheapestPricesTable[adjacentCity.name] = priceThroughCurrentCity
        cheapestPreviousStopoverCityTable[adjacentCity.name] = currentCity.name
      }
    }

    // visit next unvisited city and choose the one that is cheapest to get to from starting city
    let sortedVisitedCities = [...unvisitedCities].sort((cityA, cityB) => cityA.price - cityB.price)
    let cheapestUnvisitedCity = sortedVisitedCities[0]
    currentCity = cheapestUnvisitedCity
  }

  // now the algorithm is done and cheapest_prices_table contains all cheapest prices to get to each city from starting city
  // to calculate precise path to take from starting city to final destination...
  let shortestPath = []
  let currentCityName = finalDestination.name
  while (currentCityName != startingCity.name) {
    shortestPath.push(currentCityName)
    currentCityName = cheapestPreviousStopoverCityTable[currentCityName]
  }
  shortestPath.push(startingCity.name)

  return shortestPath.reverse()
}