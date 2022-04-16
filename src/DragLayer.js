import React from 'react';
import { useDragLayer } from 'react-dnd';
import RowDragPreview from './RowDragPreview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
};

const DragLayer = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <RowDragPreview game={item.game} ready={item.ready} />
      </div>
    </div>
  );
};

export default DragLayer;