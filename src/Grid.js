import { useState, useEffect } from "react";
import { dijkstraAlgorithm, returnShortestPath } from "./algorithm";
import Node from "./Node";

function Grid() {
  const [grid, setGrid] = useState([]);
  const [mouseIsClicked, setMouseIsClicked] = useState(false);
  const TOTAL_ROW = 20;
  const TOTAL_COL = 50;
  const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  const END_NODE_ROW = 19;
  const END_NODE_COL = 45;

  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    let newGrid = Array.from({ length: TOTAL_ROW }).map((currRow, rowIdx) => {
      return Array.from({ length: TOTAL_COL }).map((currCol, colIdx) => {
        return createNode(rowIdx, colIdx);
      });
    });

    setGrid(newGrid);
  };

  const createNode = (rowIdx, colIdx) => {
    return {
      rowIdx,
      colIdx,
      alreadyVisited: false,
      distance: Infinity,
      startNode: rowIdx === START_NODE_ROW && colIdx === START_NODE_COL,
      endNode: rowIdx === END_NODE_ROW && colIdx === END_NODE_COL,
      wall: false,
      prevNode: null,
    };
  };

  const handleWallChange = (rowIdxArg, colIdxArg) => {
    let newGrid = grid.map((row, rowIdx) => {
      return row.map((col, colIdx) => {
        if (rowIdx === rowIdxArg && colIdx === colIdxArg) {
          let { wall } = col;
          console.log(wall);
          return { ...col, wall: !wall };
        }
        return col;
      });
    });
    setGrid(newGrid);
  };
  const handleMouseDown = (rowIdx, colIdx) => {
    setMouseIsClicked(true);
    handleWallChange(rowIdx, colIdx);
  };

  const handleMouseEnter = (rowIdx, colIdx) => {
    if (!mouseIsClicked) return;
    handleWallChange(rowIdx, colIdx);
  };

  const handleMouseLeave = (rowIdx, colIdx) => {
    setMouseIsClicked(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.rowIdx}-${node.colIdx}`).className = "node node-visited";
      }, 10);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.rowIdx}-${node.colIdx}`).className = "node node-shortest-path";
      }, 50);
    }
  };

  const visualiseDijkstraAlgo = () => {
    const nodesVisitedInOrder = dijkstraAlgorithm(grid, grid[START_NODE_ROW][START_NODE_COL], grid[END_NODE_ROW][END_NODE_COL]);
    const shortestPath = returnShortestPath(grid[END_NODE_ROW][END_NODE_COL]);
    console.log(shortestPath);
    animateDijkstra(nodesVisitedInOrder, shortestPath);
  };

  return (
    <div className="Grid">
      <h1
        onMouseDown={() => {
          alert("hello");
        }}
      >
        Dijkstra Path Finding Visualisation
      </h1>
      <div className="Grid-grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((col, colIdx) => {
                return (
                  <Node
                    key={`${rowIdx}-${colIdx}`}
                    {...col}
                    mouseIsClicked={mouseIsClicked}
                    onMouseDown={(rowIdx, colIdx) => handleMouseDown(rowIdx, colIdx)}
                    onMouseEnter={(rowIdx, colIdx) => handleMouseEnter(rowIdx, colIdx)}
                    onMouseLeave={(rowIdx, colIdx) => handleMouseLeave(rowIdx, colIdx)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <button onClick={visualiseDijkstraAlgo}>Visualise</button>
    </div>
  );
}

export default Grid;
