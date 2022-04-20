import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Cross from './img/x.svg';

import './InfoModal.css';

function InfoModal({ onClose, onChangeNightMode, nightMode, openInTab, setOpenInTab, clearFavs }) {
  const [clearConfirmVisible, setClearConfirmVisible] = useState(false);
  const appVersion = document.querySelector('meta[name="appversion"]').content || '1.0.0';

  const onChangeMode = (value) => {
    onChangeNightMode(value);
    window.localStorage.setItem('wordleList-nightMode', value);
  }

  const onChangeTab = (value) => {
    setOpenInTab(value === 'true');
    window.localStorage.setItem('wordleList-openInTab', value);
  }

  const clearData = () => {
    setClearConfirmVisible(false);
    clearFavs();
  };

  const cancelClear = () => setClearConfirmVisible(false);

  const clearDataConfirm = (
    <>
      You sure? All your favorites will be lost.
      <button className="infoModal-deleteButton" onClick={clearData}>Do it!</button>
      <button className="infoModal-nevermind" onClick={cancelClear}>Nevermind</button>
    </>
  );

  return (
    <div className="infoModal-container f-col">
      <div className="infoModal">
        <div className="infoModal-titleRow">
            <Cross onClick={onClose} />
            <div className="infoModal-title firstLetter">About</div>
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

        <div className="infoModal-title firstLetter">Options</div>
        <div className="infoModal-optionRow">
          <div className="infoModal-optionTitle">Night Mode</div>
          <div className="infoModal-optionRowContents">
          <div className="infoModal-radioItem">
            <input
              type="radio"
              name="nightMode"
              value="on"
              checked={nightMode === 'on'}
              onChange={e => onChangeMode(e.currentTarget.value)}
            />
            <label htmlFor="on" onClick={() => onChangeMode('on')}>On</label>
          </div>
          <div className="infoModal-radioItem">
            <input
              type="radio"
              name="nightMode"
              value="off"
              checked={nightMode === 'off'}
              onChange={e => onChangeMode(e.currentTarget.value)}
            />
            <label htmlFor="off" onClick={() => onChangeMode('off')}>Off</label>
          </div>

          <div className="infoModal-radioItem">
            <input
              type="radio"
              name="nightMode"
              value="auto"
              checked={nightMode === 'auto'}
              onChange={e => onChangeMode(e.currentTarget.value)}
            />
            <label htmlFor="auto" onClick={() => onChangeMode('auto')}>Auto</label>
          </div>
          </div>
        </div>

        <div className="infoModal-optionRow">
          <div className="infoModal-optionTitle">Open games in new tab</div>
                    <div className="infoModal-optionRowContents">

            <div className="infoModal-radioItem">
              <input
                type="radio"
                name="openInTab"
                value="true"
                checked={openInTab}
                onChange={e => onChangeTab(e.currentTarget.value)}
              />
              <label htmlFor="on" onClick={() => onChangeTab('true')}>On</label>
            </div>
            <div className="infoModal-radioItem">
              <input
                type="radio"
                name="openInTab"
                value="false"
                checked={!openInTab}
                onChange={e => onChangeTab(e.currentTarget.value)}
              />
              <label htmlFor="off" onClick={() => onChangeTab('false')}>Off</label>
            </div>
          </div>
        </div>
        <div className="infoModal-title firstLetter">Data</div>
        <div className="infoModal-deleteContainer">
          {!clearConfirmVisible && <button className="infoModal-deleteButton" onClick={() => setClearConfirmVisible(true)}>Remove all favorites</button>}
          {clearConfirmVisible && clearDataConfirm}
        </div>
      </div>
    </div>
  );
}

InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChangeNightMode: PropTypes.func.isRequired,
  nightMode: PropTypes.string.isRequired,
  setOpenInTab: PropTypes.func.isRequired,
  clearFavs: PropTypes.func.isRequired,
  openInTab: PropTypes.bool.isRequired,
};

export default InfoModal;
