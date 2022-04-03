import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import QuestionMark from './img/question.svg';
import Gear from './img/gear.svg'


import './Header.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function FavoriteButton({ toggled, openInfo, openOptions }) {
  return (
    <div className="wordleHeader">
      <div className="wordleHeader-titleRow">
          <QuestionMark className="questionIcon" onClick={openInfo} />
          <div className="wordleHeader-title">Wordle tracker app</div>
          <Gear className="gearIcon" />
      </div>

      <div className="wordleHeader-desc" onClick={openOptions} >An app for tracking all your Wordle games! See https://github.com/rapka/wordle-list for more info.</div>
    </div>
  );
}

FavoriteButton.propTypes = {
  toggled: PropTypes.bool,
  onClick: PropTypes.func,
  openOptions: PropTypes.func.isRequired,
  openInfo: PropTypes.func.isRequired,
};

export default FavoriteButton;
