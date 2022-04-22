import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import QuestionMark from './img/question.svg';
import Gear from './img/gear.svg';

import './Header.css';

const markdownLinkToHref = (str) => str.replace(/\[(.*)\]\((.*)\)/, '<a href="$2">$1</a>');

function Header({ openInfo, openOptions }) {
  return (
    <header className="wordleHeader">
      <div className="wordleHeader-titleRow">
          <QuestionMark className="questionIcon" onClick={openInfo} />
          <Gear className="gearIcon" onClick={openOptions} />
          <div className="wordleHeader-title" aria-label="Wordle Bookmark App"><div className="firstLetter">Wordle</div>&nbsp;<div className="firstLetter">Bookmarks</div></div>
      </div>
      <div className="wordleHeader-desc">A simple app for finding all your daily Wordle games.</div>
    </header>
  );
}

Header.propTypes = {
  openInfo: PropTypes.func.isRequired,
  openOptions: PropTypes.func.isRequired,
};

export default Header;
