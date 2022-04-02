import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Gear from './img/gear.svg'

import './Header.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function FavoriteButton({ toggled, onClick }) {
  return (
    <div className="wordleHeader">
      <div className="wordleHeader-titleRow">

          <div className="wordleHeader-title">Wordle tracker app</div>
          <Gear />
      </div>

      <div className="wordleHeader-desc">An app for tracking all your Wordle games! See https://github.com/rapka/wordle-list for more info.</div>
    </div>
  );
}

FavoriteButton.propTypes = {
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FavoriteButton;
