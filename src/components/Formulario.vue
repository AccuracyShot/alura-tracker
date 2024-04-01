<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione um projeto</option>
            <option :value="projeto.id"
             v-for="projeto in projetos"
            :key="projeto.id"
            >
            {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="column">
        <Temporizador @aoTemporizadorFinalizado="salvarTarefa"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from './Temporizador.vue'
import { useStore } from '@/store'; 
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: "Formulario-vue",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  },
  setup(props, { emit } ) {
    const store = useStore();

    const descricao = ref('')
    const idProjeto = ref('')

    const projetos = computed(() => store.state.projeto.projetos); // primeiro, buscamos pelo projeto

    const salvarTarefa = (tempoDecorrido: number) : void => {
        
        if(!projetos.value) { // se o projeto não existe...
            store.commit(NOTIFICAR, {
                titulo: 'Ops!',
                texto: "Selecione um projeto antes de finalizar a tarefa!",
                tipo: TipoNotificacao.FALHA,
            }); // notificamos o usuário
            return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
        }
        // se o projeto existe, seguimos normalmente...
        emit('aoSalvarTarefa', {
            duracaoEmSegundos: tempoDecorrido,
            descricao: descricao.value,
            projeto: projetos.value.find(proj => proj.id == idProjeto.value)
        })
        descricao.value = ''
    }
        

      return {
          descricao,
          idProjeto,
          projetos,
          salvarTarefa
      }
    }
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
