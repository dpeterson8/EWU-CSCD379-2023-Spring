<template>
  <v-card
    class="mt-5 me-5"
    position="absolute"
    location="top end"
    elevation="0"
    variant="outlined"
    @click="dialog = !dialog"
  >
    <h2 class="pt-2 pe-5 ps-5 pb-2">Player name: {{ props.playerName }}</h2>
  </v-card>
  <div class="text-center">
    <v-dialog v-model="dialog" activator="parent" width="auto" persistent>
      <v-card title="Please enter Player name:" subtitle="If no name is enter will play as Guest:">
        <v-text-field
          class="ps-5 pe-5 pt-5"
          label="Player Name:"
          variant="outlined"
          v-model="name"
          @input="enterChar(name)"
        ></v-text-field>

        <v-card-actions class="justify-center">
          <v-btn variant="outlined" @click="dialog = !dialog">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  playerName: string
}>()

var dialog = ref(true)
var name = ''

const emits = defineEmits<{
  (event: 'enterChar', value: string): void
}>()

function enterChar(value: string) {
  emits('enterChar', value)
}
</script>
