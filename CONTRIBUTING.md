# Contributing

If you want to add a new game to the list, feel free to open a PR! The list of game variants lives in [games.json](./games.json). Here's the format for each listing:
```
{
	"title": "Wordle", // Name of the game
	"description": "Original Formula (New York Times owned)", // Brief description of the gameplay
	"url": "https://www.nytimes.com/games/wordle/index.html", // Link to play the game
	"type": "standard" // Type of gameplay
}
```

`type` can be one of `standard`, `newDictionary`, `newGameplay`, or `semantic` depending on the section you want the variant to appear in. Please try to keep descriptions under 30 characters so they show up nice on mobile devices.