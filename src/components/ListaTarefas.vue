<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';

import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
  name: 'ListaTarefas',
  components: {
    Cronometro,
    Box
  },
  props: {
    tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
    }
  }
});
</script>

<style scoped>
    .columns {
        align-items: center;
    }
    .column {
        display: flex;
        justify-content: center;
    }
</style>