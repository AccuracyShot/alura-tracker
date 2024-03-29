<template>
        <Formulario @aoSalvarTarefa="salvarTarefa"/>
        <div class="lista">
          <ListaTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
          <div class="modal" :class="{'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Editando tarefa</p>
                  <button @click="fecharModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                  <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                      Descrição da tarefa
                    </label>
                    <input type="text"
                     class="input"
                     v-model="tarefaSelecionada.descricao" placeholder="Descrição da tarefa">
                  </div>
                </section>
                <footer class="modal-card-foot">
                  <div class="buttons">
                    <button class="button is-success">Salvar Alterações</button>
                    <button @click="fecharModal" class="button">Cancelar</button>
                  </div>
                </footer>
              </div>
          </div>
          <Box v-if="listaEstaVazia">
            Você não está muito produtivo hoje, hein?
          </Box>
        </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Formulario from '../components/Formulario.vue'
  import ListaTarefas from '../components/ListaTarefas.vue'
  import Box from '../components/Box.vue'
  import { CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';
import ITarefa from '@/interfaces/ITarefa';
  
  export default defineComponent({
    name: 'App',
    components: {
      Formulario,
      ListaTarefas,
      Box
    },
    data () {
      return {
        tarefaSelecionada: null as ITarefa | null
      }
    },
    computed: {
      listaEstaVazia () : boolean {
        return this.tarefas.length == 0
      }
    },
    methods: {
      salvarTarefa (tarefa: ITarefa): void {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa)
      },
      selecionarTarefa (tarefa: ITarefa): void {
        this.tarefaSelecionada = tarefa
      },
      fecharModal (): void {
        this.tarefaSelecionada = null
      }
    },
    setup () {
      const store = useStore();
      store.dispatch(OBTER_TAREFAS)
      return {
        tarefas: computed(() => store.state.tarefas),
        store
      }
    }
  });
  </script>

  