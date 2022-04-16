const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const templateText = fs.readFileSync(path.join(__dirname, 'readmeTemplate.md'), { encoding: 'utf-8' });
const gamesList = JSON.parse(fs.readFileSync(path.join(__dirname, '../games.json')));

const createReadmeLine = (game) => `| ${game.title} | ${game.description} | [PLAY](${game.url}) | `;
const createLines = (games, type) => _.map(_.filter(games, { type }), createReadmeLine).join('\n');

const standardGames = createLines(gamesList, 'standard');
const newDictionaryGames = createLines(gamesList, 'newDictionary');
const newGameplayGames = createLines(gamesList, 'newGameplay');
const semanticGames = createLines(gamesList, 'semantic');
const gameCount = Math.floor(gamesList.length / 5) * 5;

const templateOptions = {
	standardGames,
	newDictionaryGames,
	newGameplayGames,
	semanticGames,
	gameCount,
};

const templatefunction = _.template(templateText);
const readme = templatefunction(templateOptions);

fs.writeFileSync(path.join(__dirname, '../README.md'), readme);