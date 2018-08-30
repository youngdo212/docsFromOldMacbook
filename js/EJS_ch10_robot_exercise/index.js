const {randomRobot, routeRobot, goalOrientedRobot} = require("./example-robots.js");
const {VillageState, runRobot} = require("./state.js");

runRobot(VillageState.random(), goalOrientedRobot, []);