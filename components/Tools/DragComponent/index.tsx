import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Space, Button } from "antd";
const DragItem = ({ text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ text }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.4 : 1,
        border: "solid 2px black",
        padding: 10,
      }}
    >
      {text}
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "item",
    drop: (item) => onDrop(item.text),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        padding: "20px",
        backgroundColor: isOver && canDrop ? "lightgreen" : "white",
      }}
    >
      Drop Here
    </div>
  );
};

const DragAndDropExample = () => {
  const [droppedText, setDroppedText] = useState("");

  const onDrop = (text) => {
    setDroppedText(text);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Space>
          <DragItem text="Alice" />
          <DragItem text="Bob" />
        </Space>
      </div>
      <DropZone onDrop={onDrop} />
      <p>Dropped Text: {droppedText}</p>
    </DndProvider>
  );
};

export default DragAndDropExample;
