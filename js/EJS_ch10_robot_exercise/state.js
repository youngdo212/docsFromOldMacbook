const randomItem = require("random-item");
const {roadGraph} = require("./roads.js");

class VillageState{
  constructor(place, parcels, graph){
    this.botLocation = place;
    this.parcels = parcels;
    this.graph = graph;
  }
  move(destination){
    if(!this.graph[this.botLocation][destination]) return this;
    let parcels = this.parcels.map(p => {
      if(p.place !== this.botLocation) return p;
      return {place: destination, address: p.address};
    }).filter(p => p.place !== p.address);
    return new VillageState(destination, parcels, this.graph);
  }
  static random(parcelCount = 5){
    let parcels = [];
    for(let i = 0; i < parcelCount; i++){
      let place = randomItem(Object.keys(roadGraph));
      let address;
      do{
        address = randomItem(Object.keys(roadGraph));
      }while(address === place);
      parcels.push({place: place, address: address});
    }
    return new VillageState("Post Office", parcels, roadGraph);
  }
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

module.exports = {
  VillageState: VillageState,
  runRobot: runRobot
}