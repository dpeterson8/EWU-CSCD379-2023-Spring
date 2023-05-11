<template>
  <v-card width="400px" text-center elevation="0" class="mx-auto pb-10" color="transparent">
    <v-card-title class="text-lg-h2 pb-10" transparent>Leader-board</v-card-title>
    <LeaderBoard class="mx-auto" />

    <v-card-actions class="justify-center pt-10">
      <v-btn to="/" variant="outlined">Return to Home</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import LeaderBoard from '@/components/LeaderBoard.vue'
import { WordleGame } from '@/scripts/wordleGame'
import { reactive } from 'vue'
import { onMounted } from 'vue'

let game = reactive(new WordleGame())

onMounted(() => {
  game.getTopPlayers()
})
</script>
