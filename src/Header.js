import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import QuestionMark from './img/question.svg';
import Gear from './img/gear.svg'

import './Header.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function Header({ openInfo }) {
  return (
    <div className="wordleHeader">
      <div className="wordleHeader-titleRow">
          <QuestionMark className="questionIcon" onClick={openInfo} />
          <div className="wordleHeader-title">Wordle Tracker</div>
      </div>
      <div className="wordleHeader-desc">A simple app for tracking all your daily Wordle games!</div>
    </div>
  );
}

Header.propTypes = {
  openInfo: PropTypes.func.isRequired,
};

export default Header;
