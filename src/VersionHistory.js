import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

import HISTORY from '../versions.json';

import './VersionHistory.css';

function VersionHistory() {
  const [expanded, setExpanded] = useState(false);
  const currentRows = expanded ? HISTORY : [HISTORY.at(-1)];

  const rows = currentRows.map((version) => {
    const notes = version.notes.map((note => <li key={note}>{note}</li>));
    return <div>{version.version}<ul>{notes}</ul></div>;
  });

  return (
    <div className="versionHistory">
      <div className="versionHistory-list">
        {rows}
      </div>
      <a className="versionHistory-button" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'view less' : 'view more'}
      </a>
    </div>
  );
}

VersionHistory.propTypes = {
  expanded: PropTypes.bool,
};

export default VersionHistory;
