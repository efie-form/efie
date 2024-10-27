import type { DragEvent } from 'react';
import { useState } from 'react';

function useDragDirection() {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });

  const registerDragEvent = (e: DragEvent<HTMLDivElement>) => {
    const mousePos = { x: e.clientX, y: e.clientY };
    setPrevMousePos(mousePos);

    if (mousePos.y === prevMousePos.y) return;

    setDirection(mousePos.y > prevMousePos.y ? 1 : -1);
  };

  return {
    direction,
    registerDragEvent,
  };
}

export default useDragDirection;
