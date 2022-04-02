import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeartIcon from './img/heart.svg';

import './FavoriteButton.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function FavoriteButton({ toggled, onClick }) {
  return (
    <div className="favButton" onClick={onClick}>
        <HeartIcon className={`heartIcon ${toggled ? 'filled' : ''}`} />
    </div>
  );
}

FavoriteButton.propTypes = {
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FavoriteButton;
