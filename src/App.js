import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { arrayMoveImmutable } from 'array-move';
import Header from './Header';

import Row from './Row';

import './App.css';

const MINUTE = 1000 * 60 * 60;

function WordleList({ games }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(window.localStorage.getItem('wordleList-favorites')) || []);
  const [lastPlayed, setLastPlayed] = useState(JSON.parse(window.localStorage.getItem('wordleList-history')) || {});
  const [timestamp, setTimestamp] = useState(Date.now());

  // let favorites = [];

 //  // Similar to componentDidMount and componentDidUpdate:
 //  useEffect(() => {
 //   favorites = ;
 // });

 const ifFaved = title => favorites.includes(title);

  setTimeout(() => {
    setTimestamp(Date.now());
  }, MINUTE);



  const favComponents = [];
  const nonFavComponents = [];

  console.log(favorites, 'favorites', favComponents, nonFavComponents);

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

    window.localStorage.setItem('wordleList-history', JSON.stringify(newFavs));
    setLastPlayed(prevState => { return {...prevState, ...newLastPlayed }; });
  };

  const moveRow = (title, targetIndex) => {
    setFavorites([...arrayMoveImmutable(favorites, favorites.indexOf(title), targetIndex)]);
  };

  games.map(game => {
    if (favorites.indexOf(game.title) === -1) {
      nonFavComponents.push(
        <Row
          key={game.title}game={game}
          faved={false}
          onFav={() => addFav(game.title)}
          onUnFav={() => removeFav(game.title)}
          onPlay={setLastPlayedGame}
          lastPlay={lastPlayed[game.title]}
          favorites={favorites}
          moveRow={moveRow}
        />
      );
    }
  });

  favorites.map(title => {
    const game = find(games, { title });
    console.log('mapp', games, game, title);
    favComponents.push(
      <Row
        key={game.title}
        game={game}
        faved={true}
        onFav={() => addFav(game.title)}
        onUnFav={() => removeFav(game.title)}
        onPlay={setLastPlayedGame}
        lastPlay={lastPlayed[game.title]}
        favorites={favorites}
        moveRow={moveRow}
      />
    );
  });

  const favoritesList = favorites.length ? (
    <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
      <div className="favComponents f-col">
        <div className="wordleList-favHeader">FAVORITES</div>
        {favComponents}
      </div>
    </DndProvider>
  ) : null;

  return (
    <div className="wordleList f-col" id="worldleList-app">
      <Header />
      {favoritesList}
      <div className="nonFavComponents f-col">
        {nonFavComponents}
      </div>
    </div>
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
