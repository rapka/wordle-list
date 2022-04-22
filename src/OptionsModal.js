import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Cross from './img/x.svg';

import './OptionsModal.css';
import './Modal.css';

function OptionsModal({ onClose, onChangeNightMode, nightMode, openInTab, setOpenInTab, clearFavs }) {
  const [clearConfirmVisible, setClearConfirmVisible] = useState(false);

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
      <button className="optionsModal-deleteButton" onClick={clearData}>Do it!</button>
      <button className="optionsModal-nevermind" onClick={cancelClear}>Nevermind</button>
    </>
  );

  return (
    <div className="modal-container f-col">
      <div className="modal optionsModal">
        <div className="modal-titleRow">
            <Cross onClick={onClose} />
            <div className="modal-title firstLetter">Options</div>
        </div>
        <div className="optionsModal-optionRow">
          <div className="optionsModal-optionTitle">Night Mode</div>
          <div className="optionsModal-optionRowContents">
          <div className="optionsModal-radioItem">
            <input
              type="radio"
              name="nightMode"
              value="on"
              checked={nightMode === 'on'}
              onChange={e => onChangeMode(e.currentTarget.value)}
            />
            <label htmlFor="on" onClick={() => onChangeMode('on')}>On</label>
          </div>
          <div className="optionsModal-radioItem">
            <input
              type="radio"
              name="nightMode"
              value="off"
              checked={nightMode === 'off'}
              onChange={e => onChangeMode(e.currentTarget.value)}
            />
            <label htmlFor="off" onClick={() => onChangeMode('off')}>Off</label>
          </div>

          <div className="optionsModal-radioItem">
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

        <div className="optionsModal-optionRow">
          <div className="optionsModal-optionTitle">Open games in new tab</div>
                    <div className="optionsModal-optionRowContents">

            <div className="optionsModal-radioItem">
              <input
                type="radio"
                name="openInTab"
                value="true"
                checked={openInTab}
                onChange={e => onChangeTab(e.currentTarget.value)}
              />
              <label htmlFor="on" onClick={() => onChangeTab('true')}>On</label>
            </div>
            <div className="optionsModal-radioItem">
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
        <div className="optionsModal-title firstLetter">Data</div>
        <div className="optionsModal-deleteContainer">
          {!clearConfirmVisible && <button className="optionsModal-deleteButton" onClick={() => setClearConfirmVisible(true)}>Remove all favorites</button>}
          {clearConfirmVisible && clearDataConfirm}
        </div>
      </div>
    </div>
  );
}

OptionsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChangeNightMode: PropTypes.func.isRequired,
  nightMode: PropTypes.string.isRequired,
  setOpenInTab: PropTypes.func.isRequired,
  clearFavs: PropTypes.func.isRequired,
  openInTab: PropTypes.bool.isRequired,
};

export default OptionsModal;
