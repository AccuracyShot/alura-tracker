<template>
    <Box>
      <div class="columns clicavel" @click="tarefaClicada">
        <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
        <div class="column is-4">
          {{ tarefa.projeto.nome }} 
        </div>
        <div class="column">
          <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
        </div>
      </div>
      <div class="column is-1">
          <button class="button is-danger ml-1" @click="excluir(tarefa.id)">Excluir</button>
      </div>
    </Box>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import Cronometro from "./Cronometro.vue";
  import ITarefa from '../interfaces/ITarefa'
  import Box from './Box.vue'
import { REMOVER_TAREFA } from "@/store/tipo-acoes";
import { useStore } from '@/store'; 

  
  export default defineComponent({
    name: "ListaTarefas",
    emits: ['aoTarefaClicada'],
    components: {
      Cronometro,
      Box
    },
    props: {
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
      }
    },
    methods: {
      tarefaClicada() {
        this.$emit('aoTarefaClicada', this.tarefa)
      },
      excluir(id: number) {
            this.store.dispatch(REMOVER_TAREFA, id);
      }
    },
    setup() {
      const store = useStore();
      return {
        store
      }
    }
  });
  </script>

<style scoped>
.clicavel {
    cursor: pointer;
}

.botao-deletar {
    background-color: red;
    color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 10%;
    /* padding: 0.5rem; */
    font-size: 1rem;
    cursor: pointer;
}

</style>