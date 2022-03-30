import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Outfit from './outfit.woff2';

import './FavoriteButton.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function FavoriteButton({ toggled, onClick }) {
  return (
    <div className="favButton" onClick={onClick}>
        {toggled ? '</3' : '<3'}
    </div>
  );
}

FavoriteButton.propTypes = {
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FavoriteButton;
