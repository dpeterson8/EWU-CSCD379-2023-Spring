<template>
  <v-card width="400" title="Top players:" subtitle="Top 10 players will be shown below">
    <v-list-item active-color="primary" display="flex">
      <template v-slot:prepend>
        <v-list-item-title class="pe-5"> # </v-list-item-title>
        <v-icon icon="mdi-account"></v-icon>
      </template>

      <div class="d-flex flex-wrap justify-space-between">
        <v-list-item-title>Player Name:</v-list-item-title>
        <v-list-item-title>Average Score:</v-list-item-title>
      </div>
    </v-list-item>

    <v-list-item
      v-for="(item, i) in game.topPlayers"
      :key="i"
      :value="item"
      active-color="primary"
      display="flex"
    >
      <template v-slot:prepend>
        <v-list-item-title class="pe-5">{{ i + 1 }}</v-list-item-title>
        <v-icon icon="mdi-account"></v-icon>
      </template>

      <div class="d-flex flex-wrap justify-space-between">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-title>{{ item.average }}</v-list-item-title>
      </div>
    </v-list-item>
  </v-card>
</template>

<script setup lang="ts">
import { WordleGame } from '@/scripts/wordleGame'
import { reactive } from 'vue'
import { onMounted } from 'vue'

let game = reactive(new WordleGame())

onMounted(() => {
  game.getTopPlayers()
})
</script>
