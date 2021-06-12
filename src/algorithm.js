const dijkstraAlgorithm = (grid, startNode, endNode) => {
  startNode.distance = 0;
  let nodesVisited = [];
  let allNodes = [];
  for (let row of grid) {
    for (let col of row) {
      allNodes.push(col);
    }
  }

  // let allNodes = grid.map((row) => row.map((col) => col));
  // console.log(allNodes);
  // Now we will sort the allNodes
  allNodes = allNodes.sort((node1, node2) => node1.distance - node2.distance);
  while (allNodes.length !== 0) {
    // Now that we have all the nodes sorted (one with lowest distance is closest)
    let closestNode = allNodes.shift();
    console.log("before infinity");
    console.log(allNodes);
    console.log(closestNode);
    if (closestNode.distance === Infinity) return nodesVisited;
    console.log("before wall");
    if (closestNode.wall) continue;
    closestNode.alreadyVisited = true;
    nodesVisited.push(closestNode);
    console.log("before endNode");
    if (closestNode === endNode) return nodesVisited;
    // Now we update all the neighbouring nodes
    let neighboursOfClosestNodes = findNeighbours(closestNode, grid);

    for (let neighbours of neighboursOfClosestNodes) {
      neighbours.distance = closestNode.distance + 1;
      neighbours.prevNode = closestNode;
    }
  }
};

const findNeighbours = (node, grid) => {
  let neighboursOfClosestNodes = [];

  const { rowIdx, colIdx } = node;

  if (rowIdx > 0) neighboursOfClosestNodes.push(grid[rowIdx - 1][colIdx]);
  if (rowIdx < grid.length - 1) neighboursOfClosestNodes.push(grid[rowIdx + 1][colIdx]);
  if (colIdx > 0) neighboursOfClosestNodes.push(grid[rowIdx][colIdx - 1]);
  if (colIdx < grid[0].length - 1) neighboursOfClosestNodes.push(grid[rowIdx][colIdx + 1]);

  // Remove any nodes which are already visited

  neighboursOfClosestNodes = neighboursOfClosestNodes.filter((node) => !node.alreadyVisited);
  console.log("yeahhh");
  console.log(neighboursOfClosestNodes);
  return neighboursOfClosestNodes;
};

const returnShortestPath = (endNode) => {
  const shortestPath = [];
  let currNode = endNode;
  while (currNode !== null) {
    console.log("here");
    shortestPath.unshift(currNode);
    currNode = currNode.prevNode;
  }
  return shortestPath;
};

export { dijkstraAlgorithm, returnShortestPath };
