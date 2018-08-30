const findPath = require("./dijkstra.js").find_path;
const randomItem = require("random-item");

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function randomRobot(state){
  return {direction: randomItem(Object.keys(state.graph[state.botLocation]))};
}

function routeRobot(state, memory){
  if(memory.length === 0){
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)}
}

function goalOrientedRobot(state, memory){
  if(memory.length === 0){
    let parcel = state.parcels[0];
    if(parcel.place === state.botLocation) memory = findPath(state.graph, state.botLocation, parcel.address);
    else memory = findPath(state.graph, state.botLocation, parcel.place);
  }
  return {direction: memory[0], memory: memory.slice(1)}
}

module.exports = {
  randomRobot: randomRobot,
  routeRobot: routeRobot,
  goalOrientedRobot: goalOrientedRobot
}