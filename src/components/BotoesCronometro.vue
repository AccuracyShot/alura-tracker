<template>
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
        <span class="icon">
        <img src="../images/play.svg" alt="">
        </span>
        <span>Play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
        <span class="icon">
        <img src="../images/pause.svg" alt="">
        </span>
        <span>Stop</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ControlesTemporizador',
  props: {
    cronometroRodando: {
      type: Boolean,
      required: true
    }
  },
  emits: ['iniciar', 'finalizar'],
  methods: {
    iniciar() {
      this.$emit('iniciar');
    },
    finalizar() {
      this.$emit('finalizar');
    }
  }
});
</script>