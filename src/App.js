import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { arrayMoveImmutable } from 'array-move';
import Header from './Header';
import Row from './Row';
import InfoModal from './InfoModal';
import DragLayer from './DragLayer';

import './App.css';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

function formatCountdown(ms) {
  let h = ms / 3.6e6 | 0;
  let m = (ms % 3.6e6) / 6e4 | 0;
  let s = (ms % 6e4) / 1e3 | 0;
  return `${h}:${('' + m).padStart(2, '0')}:${('' + s).padStart(2, '0')}`;
}

function WordleList({ games }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem('wordleList-favorites')) || []);
  const [lastPlayed, setLastPlayed] = useState(JSON.parse(window.localStorage.getItem('wordleList-history')) || {});
  const [timestamp, setTimestamp] = useState(Date.now());
  const [nightMode, setNightMode] = useState(window.localStorage.getItem('wordleList-nightMode') || 'auto');
  const [openInTab, setOpenInTab] = useState((window.localStorage.getItem('wordleList-openInTab') || 'true') === 'true');

  useEffect(() => {
    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape') {
        setInfoOpen(false);
      }
    });
 });

 const ifFaved = title => favorites.includes(title);

  setTimeout(() => {
    setTimestamp(Date.now());
  }, SECOND);

  const tomorrow = addDays(new Date(timestamp), 1).setUTCHours(0, 0, 0, 0);
  const tomorrowNYT = addHours(tomorrow, -5).setUTCHours(5, 0, 0, 0);
  const resetTime = tomorrow - timestamp;
  const nytResetTime = tomorrowNYT - timestamp;

  const favComponents = [];
  const nonFavComponents = [];

  const addFav = (title) => {
    const newFavs = cloneDeep(favorites);
    newFavs.push(title);
    setFavorites(newFavs);
    window.localStorage.setItem('wordleList-favorites', JSON.stringify(newFavs));
  };

  const removeFav = (title) => {
    const newFavs = cloneDeep(favorites);
    newFavs.splice(newFavs.indexOf(title));

    window.localStorage.setItem('wordleList-favorites', JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  const setLastPlayedGame = (title) => {
    const newLastPlayed = lastPlayed;
    newLastPlayed[title] = timestamp;

    window.localStorage.setItem('wordleList-history', JSON.stringify(newLastPlayed));
    setLastPlayed(prevState => { return {...prevState, ...newLastPlayed }; });
  };

  const moveRow = (title, targetIndex) => {
    setFavorites([...arrayMoveImmutable(favorites, favorites.indexOf(title), targetIndex)]);
  };

  const clearFavs = () => {
    window.localStorage.setItem('wordleList-favorites', JSON.stringify([]));
    window.localStorage.setItem('wordleList-history', JSON.stringify({}));
    setFavorites([]);
    setLastPlayed({});
  };

  games.map(game => {
    if (favorites.indexOf(game.title) === -1) {
      nonFavComponents.push(
        <Row
          key={game.title}game={game}
          faved={false}
          onFav={() => addFav(game.title)}
          onUnFav={() => removeFav(game.title)}
          onPlay={() => setLastPlayedGame(game.title)}
          lastPlay={lastPlayed[game.title]}
          timestamp={timestamp}
          favorites={favorites}
          moveRow={moveRow}
          resetTime={nytResetTime}
        />
      );
    }
  });

  favorites.map(title => {
    const game = find(games, { title });

    favComponents.push(
      <Row
        key={game.title}
        game={game}
        faved={true}
        onFav={() => addFav(game.title)}
        onUnFav={() => removeFav(game.title)}
        onPlay={() => setLastPlayedGame(game.title)}
        lastPlay={lastPlayed[game.title]}
        favorites={favorites}
        timestamp={timestamp}
        moveRow={moveRow}
        resetTime={nytResetTime}
        openInTab={openInTab}
      />
    );
  });

  const favoritesList = favorites.length ? (

      <div className="favComponents f-col">
        <div className="wordleList-favHeader">Favorites</div>
        {favComponents}
      </div>

  ) : null;

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
    <div id="wordleList-app" className={`nightMode-${nightMode}`}>
      <DragLayer />
      <div id="wordleList-appContents">
        {infoOpen && <InfoModal
          onClose={() => setInfoOpen(false)}
          onChangeNightMode={setNightMode}
          nightMode={nightMode}
          openInTab={openInTab}
          setOpenInTab={setOpenInTab}
          clearFavs={clearFavs}
        />}
        <div className="wordleList f-col" >
          <Header
            openInfo={() => setInfoOpen(true)}
          />
          {favoritesList}
          <div className="nonFavComponents f-col">
            {nonFavComponents}
          </div>
        </div>
      </div>
    </div>
    </DndProvider>
  );
}

WordleList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};


export default WordleList;
