<template>
  <v-layout>
    <v-app-bar color="primary" density="compact" primary>
      <v-app-bar-title to="/">
        <v-btn :ripple="false" variant="plain" to="/">
          <v-icon>mdi-file-word-box</v-icon>
          Wordle
        </v-btn>
      </v-app-bar-title>

      <TutorialCard></TutorialCard>
      <SettingsTab></SettingsTab>
      <template v-slot:append>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-file-word-box"
          title="Home"
          value="home"
          to="/"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about" to="/about"></v-list-item>
        <v-list-item
          prepend-icon="mdi-abacus"
          title="Leader-board"
          value="leader-board"
          to="/leaderboard"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import TutorialCard from '@/components/TutorialCard.vue'
import SettingsTab from '@/components/SettingsTab.vue'
import { ref } from 'vue'

let drawer = ref(false)
</script>
