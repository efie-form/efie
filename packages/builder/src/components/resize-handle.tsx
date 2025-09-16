import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface ResizeHandleProps {
  orientation: 'vertical' | 'horizontal';
  onResize: (delta: number) => void;
  className?: string;
}

export const ResizeHandle = ({ orientation, onResize, className }: ResizeHandleProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<number>(0);
  const lastPos = useRef<number>(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const currentPos = orientation === 'vertical' ? e.clientX : e.clientY;
      startPos.current = currentPos;
      lastPos.current = currentPos;
    },
    [orientation],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const currentPos = orientation === 'vertical' ? e.clientX : e.clientY;
      const delta = currentPos - lastPos.current;

      if (delta !== 0) {
        onResize(delta);
        lastPos.current = currentPos;
      }
    },
    [isDragging, orientation, onResize],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = orientation === 'vertical' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, orientation]);

  return (
    <button
      type="button"
      className={cn(
        'relative flex-shrink-0 bg-neutral-50 hover:bg-neutral-100 transition-colors border-0 p-0',
        orientation === 'vertical' ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize',
        isDragging && 'bg-primary-500',
        className,
      )}
      onMouseDown={handleMouseDown}
      aria-label={`Resize ${orientation} panel`}
    ></button>
  );
};
