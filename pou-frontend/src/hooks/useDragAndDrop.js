import { useState, useCallback } from 'react';

export const useDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [isOverTarget, setIsOverTarget] = useState(false);

  const onDragStart = useCallback((item) => {
    setDraggedItem(item);
  }, []);

  const onDragEnd = useCallback(() => {
    setDraggedItem(null);
    setIsOverTarget(false);
  }, []);

  const onDragEnter = useCallback(() => {
    setIsOverTarget(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsOverTarget(false);
  }, []);

  const checkIntersection = useCallback((dragX, dragY, targetRef) => {
    if (!targetRef.current) return false;
    const rect = targetRef.current.getBoundingClientRect();
    return (
      dragX >= rect.left &&
      dragX <= rect.right &&
      dragY >= rect.top &&
      dragY <= rect.bottom
    );
  }, []);

  return {
    draggedItem,
    isOverTarget,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    checkIntersection,
    setDraggedItem,
    setIsOverTarget
  };
};
