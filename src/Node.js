import "./Node.css";

function Node(props) {
  const { startNode, endNode, wall, rowIdx, colIdx, onMouseDown, onMouseEnter, onMouseLeave } = props;
  const classAdded = startNode ? "node-start" : endNode ? "node-end" : wall ? "node-wall" : "";

  return (
    <div
      id={`node-${rowIdx}-${colIdx}`}
      className={`node ${classAdded}`}
      onMouseDown={() => onMouseDown(rowIdx, colIdx)}
      onMouseEnter={() => onMouseEnter(rowIdx, colIdx)}
      onMouseLeave={() => onMouseLeave(rowIdx, colIdx)}
    ></div>
  );
}

export default Node;
