exports.buildGraph = function (edges){
  let graph = {};
  function addEdge(from, to){
    graph[from] = graph[from] || {};
    graph[from][to] = 1;
  }
  for(let [from, to] of edges){
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}