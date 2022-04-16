import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';

import DragIcon from './img/drag.svg';

import './Row.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

const RowDragPreview = ({ game, ready }) => {
  const faved = true;

  return (
    <div className="wordleList-row faved preview">
      <div className="wordleList-dragButton" ><DragIcon /></div>
      <FavoriteButton toggled={true} />
      <div className="wordleList-rowTitle">{game.title}</div>
      <div className="wordleList-rowDesc" dangerouslySetInnerHTML={{ __html: markdownLinkToHref(game.description) }} />
      <a className={`wordleList-playButton ${ready ? 'ready' : ''}`}>Play</a>
    </div>
  );
};

RowDragPreview.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  ready: PropTypes.bool,
};

export default RowDragPreview;