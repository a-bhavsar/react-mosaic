import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { MosaicContext } from './contextTypes';
import { MosaicDragItem, MosaicDropData, MosaicDropTargetPosition } from './internalTypes';
import { MosaicDragType, MosaicPath } from './types';

export interface MosaicDropTargetProps {
  position: MosaicDropTargetPosition;
  path: MosaicPath;
}

export function MosaicDropTarget({ path, position }: MosaicDropTargetProps) {
  const { mosaicId } = useContext(MosaicContext);
  const [{ isOver, draggedMosaicId }, connectDropTarget] = useDrop({
    accept: MosaicDragType.WINDOW,
    drop: (item: MosaicDragItem | undefined, _monitor): MosaicDropData => {
      console.log(item);
      console.log(_monitor);
      console.log(mosaicId);
      console.log(path);
      console.log(position);
      if (mosaicId === item?.mosaicId) {
        return { path, position };
      } else {
        return {};
      }
    },
    collect: (monitor) => {
      console.log(monitor);
      console.log(monitor.isOver());
      console.log(monitor.getItem());
      return {
        isOver: monitor.isOver(),
        draggedMosaicId: (monitor.getItem() || {}).mosaicId,
      };
      
    },
  });
  return (
    <div
      ref={connectDropTarget}
      className={classNames('drop-target', position, {
        'drop-target-hover': isOver && draggedMosaicId === mosaicId,
      })}
    />
  );
}
