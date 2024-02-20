<template>
        <div
            class="is-flex is-align-items-center is-justify-content-space-between"
        >
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />
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
          </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Formulario-vue",
  components: {
      Cronometro
  },
  data () {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  computed: {
    tempoDecorrido () : string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
    }
  },
  methods: {
    iniciar () {
      // começar a contagem
      // 1 seg = 1000 ms
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1        
      }, 1000)
    },
    finalizar () {
        this.cronometroRodando = false
      clearInterval(this.cronometro)
    },
  }
});
</script>