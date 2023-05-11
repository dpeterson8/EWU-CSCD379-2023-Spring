<template>
  <GameBoard :game="game" @letterClick="addChar" />

  <KeyBoard
    @backspace="backspace"
    @checkGuess="checkGuess"
    @letterClick="addChar"
    :guessedLetters="game.guessedLetters"
  />

  <LoseCard :ifLoss="game.status === WordleGameStatus.Lost" @restartGame="restartGame"> </LoseCard>
  <WinCard :ifWon="game.status === WordleGameStatus.Won" @restartGame="restartGame"> </WinCard>
  <WordList :game="game"></WordList>

  <h3>Current secret word: {{ game.secretWord }}</h3>
  <PlayerNameCard :playerName="game.currentPlayer" @enterChar="setName"></PlayerNameCard>
</template>

<script setup lang="ts">
import * as tone from '@/components/audio/click.mp3'
import { WordleGame } from '@/scripts/wordleGame'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import GameBoard from '../components/GameBoard.vue'
import KeyBoard from '../components/KeyBoard.vue'
import type { Letter } from '@/scripts/letter'
import { WordsService } from '@/scripts/wordsService'
import WordList from '@/components/WordList.vue'
import { WordleGameStatus } from '@/scripts/wordleGame'
import WinCard from '@/components/WinCard.vue'
import LoseCard from '@/components/LoseCard.vue'
import PlayerNameCard from '@/components/PlayerNameCard.vue'

var audio = new Audio(tone.default)
audio.volume = 0.4
const guess = ref('')
const win = ref(false)
const game = reactive(new WordleGame())
console.log(game.secretWord)

onMounted(() => {
  window.addEventListener('keyup', keyPress)
})
onUnmounted(() => {
  window.removeEventListener('keyup', keyPress)
})

function checkGuess() {
  if (game.guess.text.length === 5) {
    game.submitGuess()
    guess.value = ''
  }

  if (game.status === WordleGameStatus.Won) {
    win.value = true
  }
}

function restartGame() {
  if (game.status !== WordleGameStatus.Active) {
    game.restartGame()
    win.value = false
  }
}

function addChar(letter: Letter) {
  if (game.guess.text.length < 5) {
    audio.play()
    game.guess.push(letter.char)
    game.validWordList = WordsService.validWords(game.guess.text)
  }
}

function backspace() {
  audio.play()
  guess.value = guess.value.slice(0, -1)
  game.guess.pop()
}

function keyPress(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    checkGuess()
  } else if (event.key === 'Backspace') {
    guess.value = guess.value.slice(0, -1)
    game.guess.pop()
  }

  if (game.guess.text.length < 5 && event.key.length === 1 && event.key !== ' ') {
    guess.value += event.key.toLowerCase()
    game.guess.push(event.key.toLowerCase())
    game.validWordList = WordsService.validWords(game.guess.text)
  }
}

function setName(name: string) {
  game.setPlayerName(name)
}
</script>
