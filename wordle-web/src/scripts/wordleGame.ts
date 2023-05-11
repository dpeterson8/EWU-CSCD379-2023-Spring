import { Word } from '@/scripts/word'
import { WordsService } from './wordsService'
import type { Letter } from './letter'
import Axios from 'axios'
import { Player } from './Player'

export enum WordleGameStatus {
  Active = 0,
  Won = 1,
  Lost = 2
}

export class WordleGame {
  constructor(secretWord?: string, numberOfGuesses: number = 6) {
    if (!secretWord) secretWord = WordsService.getRandomWord()
    this.numberOfGuesses = numberOfGuesses
    this.restartGame(secretWord)
    this.currentPlayer = localStorage.getItem('playerName') || 'Guest'
  }
  currentPlayer = 'Guest'
  guessedLetters: Letter[] = []
  guesses = new Array<Word>()
  secretWord = ''
  numberOfGuesses = 6
  validWordList = new Array<string>()
  topPlayers = new Array<Player>()
  status = WordleGameStatus.Active
  guess!: Word
  amountOfGuesses = 0

  // // check length of guess
  //   if (this.letters.length !== secretWord.length) {
  //     console.log('wrong length')
  //     return
  //   }

  restartGame(secretWord?: string | null, numberOfGuesses: number = 6) {
    this.secretWord = secretWord || WordsService.getRandomWord()
    this.guesses.splice(0)

    for (let i = 0; i < numberOfGuesses; i++) {
      const word = new Word()
      this.guesses.push(word)
    }
    this.guess = this.guesses[0]
    this.status = WordleGameStatus.Active
  }

  submitGuess() {
    this.amountOfGuesses++
    // put logic to win here.
    if (this.guess.check(this.secretWord)) {
      this.status = WordleGameStatus.Won
      this.postPlayerToApi(this.currentPlayer, this.amountOfGuesses)
    }

    // Update the guessed letters
    for (const letter of this.guess.letters) {
      this.guessedLetters.push(letter)
    }

    console.log(this.guessedLetters)

    const index = this.guesses.indexOf(this.guess)
    if (index < this.guesses.length - 1) {
      this.guess = this.guesses[index + 1]
    } else {
      // The game is over
      this.status = WordleGameStatus.Lost
    }
  }

  selectGuess(word: string) {
    this.removeGuess()
    for (let i = 0; i < word.length; i++) {
      if (this.guess.letters[i].char === '') {
        this.guess.push(word[i])
      }
    }
  }

  setPlayerName(name: string) {
    if (name != '' && name != null) {
      this.currentPlayer = name
    } else {
      this.currentPlayer = 'Guest'
    }

    localStorage.setItem('playerName', name)
  }

  removeGuess() {
    while (this.guess.text !== '') {
      this.guess.pop()
    }
  }

  postPlayerToApi(name: string, attempts: number) {
    Axios.post('https://wordlewebapp2023.azurewebsites.net/Player', {
      playerName: name,
      gameCount: 1,
      averageAttempts: attempts
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  async getTopPlayers(): Promise<string> {
    const response = await Axios.get(
      'https://wordlewebapp2023.azurewebsites.net/Player/GetTopPlayers'
    )

    const tempArr = new Array<Player>()
    for (const player of response.data) {
      tempArr.push(new Player(player.playerName, player.averageAttempts))
    }
    this.topPlayers = tempArr

    return response.data
  }
}
