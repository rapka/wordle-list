import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VersionHistory from './VersionHistory';

import Cross from './img/x.svg';

import './Modal.css';
import './InfoModal.css';

function InfoModal({ onClose, onChangeNightMode, nightMode, openInTab, setOpenInTab, clearFavs }) {
  const appVersion = document.querySelector('meta[name="appversion"]').content || '1.0.0';

  return (
    <div className="modal-container f-col">
      <div className="modal infoModal">
        <div className="modal-titleRow">
            <Cross onClick={onClose} />
            <div className="modal-title firstLetter">About</div>
        </div>
        <div className="infoModal-desc">
          To get started, simply tap the heart next to  a Wordle variant to add or remove it from your favorites and drag them into your preferred order.
          <br />
          <br />
          Some games reset at midnight GMT while most others reset at midnight EST (UTC-5). Because of this, a timer of 24 hours is used to determine which games have been played recently.
          <br />
          <br />
          To access a static version of the game list, make suggestions, or see the source code, please visit the <a href="https://www.github.com/rapka/wordle-list">the Github page</a>.
          <br />
          <br />
          <div className="infoModal-credits">version {appVersion} | built with &lt;3 by <a href="https://www.twitter.com/thecollegehill">college hill</a></div>
        </div>

        <div className="modal-titleRow infoModal-historyTitle">
          <div className="modal-title firstLetter">Update History</div>
        </div>
        <VersionHistory />
      </div>
    </div>
  );
}

InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default InfoModal;
