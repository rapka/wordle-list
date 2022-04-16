import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import FavoriteButton from './FavoriteButton';

import DragIcon from './img/drag.svg';

import './Row.css';

const HOUR = 1000 * 60 * 60;

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

const Row = memo(function Row({ game, onFav, onUnFav, onPlay, faved, favorites, moveRow, lastPlay, timestamp, openInTab }) {
  const toggleFav = () => faved ? onUnFav() : onFav();
  const id = game.title;
  console.log('lastPlay', lastPlay);
  const originalIndex = favorites.indexOf(id);

  let ready = false;
  const midnight = new Date(timestamp).setHours(0, 0, 0, 0);

  // Last play was over a day ago
  if (!lastPlay) {
    ready = true;
  } else if (timestamp - lastPlay > (24 * HOUR)) {
    ready = true;
  }

  let dragRef = () => {};
  let dropRef = () => {};
  let refFunc = () => {};
  let opacity = 1;

  if (faved) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ROW',
        item: { id, originalIndex, game, ready },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveRow(droppedId, originalIndex);
            }
        },
    }), [id, favorites, moveRow], game, ready);

    const [, drop] = useDrop(() => ({
        accept: 'ROW',
        hover({ id: draggedId }) {
            console.log('in hover', id, draggedId);
            if (draggedId !== id) {
                const overIndex = favorites.indexOf(id);
                moveRow(draggedId, overIndex);
            }
        },
    }), [id, favorites, moveRow, game, ready]);

    // refFunc = (node) => drag(drop(node));
    dragRef = (node) => drag(node);
    dropRef = (node) => drop(node);

    opacity = isDragging ? 0.2 : 1;
  }

  return (
    <div className={`wordleList-row ${faved ? 'fav' : ''}`} ref={dropRef} style={{ opacity }}>
        {faved && <div className="wordleList-dragButton" ref={dragRef} ><DragIcon /></div>}
        <FavoriteButton toggled={faved} onClick={toggleFav} />
        <div className="wordleList-rowTitle">{game.title}</div>
        {!ready && false && <div className="wordleList-rowTime">{game.title}</div>}
        <div className="wordleList-rowDesc" dangerouslySetInnerHTML={{ __html: markdownLinkToHref(game.description) }} />
        <a
            href={game.url}
            onClick={onPlay}
            className={`wordleList-playButton ${ready ? 'ready' : ''}`}
            target={openInTab ? '_blank' : ''}
        >
            Play
        </a>
    </div>
  );
});

Row.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onFav: PropTypes.func,
  onPlay: PropTypes.func,
  lastPlay: PropTypes.number,
  timestamp: PropTypes.number.isRequired,
};

Row.defaultProps = {
  favorites: [],
}

export default Row;