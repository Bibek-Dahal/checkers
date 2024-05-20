# Checkers Game Implementation

## Introduction
This project is an implementation of the classic game of Checkers using HTML, CSS, and JavaScript. Checkers is a two-player strategy board game played on an 8x8 grid. The game involves diagonal moves of uniform game pieces and mandatory captures.

## Rules
1. **Board Setup**: The game is played on an 8x8 board with alternating dark and light squares.
2. **Players**: There are two players, each controlling pieces of a single color, typically black and white.
3. **Piece Movement**: Players can only move their pieces diagonally forward, one square at a time, to an adjacent empty square.
4. **Capture**: If a player's piece is adjacent to an opponent's piece and there is an empty square behind it, the player must capture the opponent's piece by jumping over it diagonally. Captured pieces are removed from the board.
5. **Multiple Captures**: If a player's piece can continue to capture other opponent pieces in a single turn, it must do so. This can result in multiple consecutive jumps.
6. **Kinging**: If a player's piece reaches the opponent's back row, it becomes a "king" and gains the ability to move and capture diagonally backward.
7. **Victory**: The game ends when one player captures all of the opponent's pieces or blocks them from making any legal moves.

## Tools Used
1. **HTML**: Used for structuring the web page and defining the game board.
2. **CSS**: Used for styling the game board, pieces, and overall appearance.
3. **JavaScript**: Used for implementing the game logic, handling player moves, and managing the game state.
4. **Visual Studio Code**: An integrated development environment used for coding and debugging.
5. **Git**: Version control system for tracking changes in the project.
6. **GitHub**: Hosting platform for the project repository and collaboration.
7. **Browser Developer Tools**: Used for testing and debugging the game in various web browsers.

## Setup and Usage
1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.
3. The game board will be displayed, and players can take turns making moves by clicking on their pieces and then on the destination square.
4. Follow the rules mentioned above to play the game.
5. The game will indicate when a player wins, and you can start a new game by refreshing the web page.

## Future Enhancements
- Implementing an AI opponent for single-player mode.
- Adding multiplayer functionality to play against others online.
- Enhancing the visual design and user experience of the game interface.
- Implementing additional game variants and rule options for customization.

## Contributors
- [Bibek Dahal](https://github.com/Bibek-Dahal)


## License
This project is licensed under the [MIT License](LICENSE).