import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import QuestionMark from './img/question.svg';

import './Header.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function Header({ openInfo }) {
  return (
    <header className="wordleHeader">
      <div className="wordleHeader-titleRow">
          <QuestionMark className="questionIcon" onClick={openInfo} />
          <div className="wordleHeader-title" aria-label="Wordle Tracker"><div className="firstLetter">Wordle</div>&nbsp;<div className="firstLetter">Tracker</div></div>
      </div>
      <div className="wordleHeader-desc">A simple app for tracking all your daily Wordle games!</div>
    </header>
  );
}

Header.propTypes = {
  openInfo: PropTypes.func.isRequired,
};

export default Header;
