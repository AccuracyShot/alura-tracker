<template>
        <div
            class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <Cronometro :tempoEmSegundos="tempoEmSegundos" />
          <BotoesCronometro 
          @iniciar="iniciar"
          @finalizar="finalizar"
          :cronometroRodando="cronometroRodando"
          />
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import BotoesCronometro from "./BotoesCronometro.vue";

export default defineComponent({
  name: "Formulario-vue",
  emits: ['temporizadorFinalizado'],
  components: {
      Cronometro,
      BotoesCronometro
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
      this.$emit('temporizadorFinalizado', this.tempoEmSegundos) //Primeiro parametro é o nome do evento, o segundo é o dado que será enviado.
      this.tempoEmSegundos = 0
    },
  }
});
</script>