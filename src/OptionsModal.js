import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Cross from './img/x.svg'

import './OptionsModal.css';

function OptionsModal({ onClose }) {
  return (
    <div className="optionsModal-container">
      <div className="optionsModal">
        <div className="optionsModal-titleRow">
            <div className="optionsModal-title">About</div>
            <Cross onClick={onClose} />
        </div>
        <div className="optionsModal-desc">An app for tracking all your Wordle games! See https://github.com/rapka/wordle-list for more info.</div>
      </div>
    </div>
  );
}

OptionsModal.propTypes = {
  onClose: PropTypes.func,
};

export default OptionsModal;
