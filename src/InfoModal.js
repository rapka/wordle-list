import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Cross from './img/x.svg'

import './InfoModal.css';

function InfoModal({ onClose }) {
  return (
    <div className="infoModal-container f-col">
      <div className="infoModal">
        <div className="infoModal-titleRow">
            <div className="infoModal-title">About</div>
            <Cross onClick={onClose} />
        </div>
        <div className="infoModal-desc">An app for tracking all your Wordle games! See https://github.com/rapka/wordle-list for more info.</div>
      </div>
    </div>
  );
}

InfoModal.propTypes = {
  onClose: PropTypes.func,
};

export default InfoModal;
