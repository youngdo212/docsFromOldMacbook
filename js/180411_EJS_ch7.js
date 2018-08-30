const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges){
  let graph = {};
  function addEdge(from, to){
    graph[from] = graph[from] || [];
    graph[from].push(to);
  }
  for(let [from, to] of edges.map(r => r.split('-'))){
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

let roadGraph = buildGraph(roads);

class VillageState{
  constructor(place, parcels){
    this.botLocation = place;
    this.parcels = parcels;
  }
  move(destination){
    if(roadGraph[this.botLocation].indexOf(destination) === -1) return this;
    let parcels = this.parcels.map(p => {
      if(p.place !== this.botLocation) return p;
      return {place: destination, address: p.address};
    }).filter(p => p.place !== p.address);
    return new VillageState(destination, parcels);
  }
}

function randomPick(arr){
  const choice = Math.floor(Math.random() * arr.length);
  return arr[choice];
}

function randomRobot(state){
  return {direction: randomPick(roadGraph[state.botLocation])};
}

function runRobot(state, robot, memory){
  for(let turn = 0;;turn++){
    if(state.parcels.length === 0){
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    memory = action.memory;
    state = state.move(action.direction);
    console.log(`Moved to ${action.direction}`);
  }
}

VillageState.random = function(parcelCount = 5){
  let parcels = [];
  for(let i = 0; i < parcelCount; i++){
    let place = randomPick(Object.keys(roadGraph));
    let address;
    do{
      address = randomPick(Object.keys(roadGraph));
    }while(address === place);
    parcels.push({place: place, address: address});
  }
  return new VillageState("Post Office", parcels);
}

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory){
  if(memory.length === 0){
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)}
}

function findRoute(graph, from, to){
  let work = [{at: from, route: []}];
  for(let i = 0; i < work.length; i++){
    let {at, route} = work[i];
    for(let place of graph[at]){
      if(place === to) return route.concat(place);
      if(work.every(w => w.at !== place)){
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

// function getOneParcelAddressRobotHas(state){
//   for(let i = 0; i < state.parcels.length; i++){
//     if(state.parcels[i].place === state.botLocation) return state.parcels[i];
//   }
//   return undefined;
// }

function goalOrientedRobot(state, memory){
  if(memory.length === 0){
    let parcel = state.parcels[0];
    if(parcel.place === state.botLocation) memory = findRoute(roadGraph, state.botLocation, parcel.address);
    else memory = findRoute(roadGraph, state.botLocation, parcel.place);
  }
  return {direction: memory[0], memory: memory.slice(1)}
}

// runRobot(VillageState.random(), myRobot, []);

function runRobot2(state, robot, memory){
  for(let turn = 0;;turn++){
    if(state.parcels.length === 0){
      return turn;
      break;
    }
    let action = robot(state, memory);
    memory = action.memory;
    state = state.move(action.direction);
  }
}

function compareRobots(robot1, memory1, robot2, memory2){
  let numStepsRobot1 = 0;
  let numStepsRobot2 = 0;
  for(let i = 0; i < 100; i++){
    let state = VillageState.random();
    numStepsRobot1 += runRobot2(state, robot1, memory1);
    numStepsRobot2 += runRobot2(state, robot2, memory2);
  }
  console.log(`robot1's average steps: ${numStepsRobot1/100}, robot2's average steps: ${numStepsRobot2/100}`);
}

compareRobots(myRobot, [], goalOrientedRobot, []);

function myRobot(state, memory){
  // return {direction: 가야할 곳, memory: 다음 루트들}
  if(memory.length === 0){
    //가야할 곳의 배열.forEach(findRoute()하면서 최단 루트를 구함)
    let places = [];
    state.parcels.forEach(p => {
      places = p.place === state.botLocation ? places.concat(p.address) : places.concat(p.place);
    })
    let min = Infinity;
    let result;
    places.forEach(place => {
      if(findRoute(roadGraph, state.botLocation, place).length < min) result = place;
    })
    memory = findRoute(roadGraph, state.botLocation, result);
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

class PGroup{
  constructor(arr=[]){
    this.data = arr;
  }
  add(value){
    let newData = this.data.slice();
    if(newData.indexOf(value) === -1) newData.push(value);
    return new PGroup(newData);
  }
  delete(value){
    return new PGroup(this.data.filter(e => e != value));
  }
  has(value){
    return this.data.indexOf(value) !== -1;
  }
}

PGroup.empty = new PGroup();

let a = PGroup.empty.add('a');
let ab = a.add('b');
let b = ab.delete('a');

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false