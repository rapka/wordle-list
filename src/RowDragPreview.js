import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';

import dragIcon from './img/drag.svg';
import Outfit from './outfit.woff2';

import './Row.css';

const HOUR = 1000 * 60 * 60;

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

const RowDragPreview = ({ game, favorites, lastPlay }) => {
  const faved = true;
  const ready = lastPlay - HOUR * 24;

  return (
    <div className="wordleList-row">
      <div className="wordleList-dragButton" ><img src={drag} /></div>
      <FavoriteButton toggled={faved} onClick={toggleFav} />
      <div className="wordleList-rowTitle">{game.title}</div>
      <div className="wordleList-rowDesc" dangerouslySetInnerHTML={{ __html: markdownLinkToHref(game.description) }} />
      <a className={`wordleList-playButton ${ready ? 'ready' : ''}`}>Play</a>
    </div>
  );
};

RowDragPreview.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  lastPlay: PropTypes.number,
};

export default RowDragPreview;