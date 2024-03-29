import ITarefa from '@/interfaces/ITarefa';
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EDITAR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import http from '@/http'

interface Estado {
    tarefas: ITarefa[];
    projetos: IProjeto[];
    notificacoes: INotificacao[]; 
}

// Copilot, explique o código abaixo:
// O código abaixo cria uma chave de injeção para o Vuex e cria uma instância do Vuex com um estado inicial.
// A chave de injeção é utilizada para injetar o Vuex em componentes Vue.
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
        state: {
            projetos: [],
            notificacoes: [],
            tarefas: [],
        },
        mutations: {
            [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
                const projeto = {
                    id: new Date().toISOString(),
                    nome: nomeDoProjeto,
                } as IProjeto;
                state.projetos.push(projeto);
            },
            [EDITAR_PROJETO](state, projeto: IProjeto) {
                const index = state.projetos.findIndex(p => p.id === projeto.id);
                state.projetos[index] = projeto;
            },
            [EXCLUIR_PROJETO](state, id: string) {
                state.projetos = state.projetos.filter(p => p.id !== id);
            },
            [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
                state.projetos = projetos;
            },
            [NOTIFICAR](state, novaNotificacao: INotificacao) {
                novaNotificacao.id = new Date().getTime();
                state.notificacoes.push(novaNotificacao);

                setTimeout(() => {
                    state.notificacoes = state.notificacoes.filter(n => n.id !== novaNotificacao.id);
                }, 3000);
            },
            [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
                state.tarefas = tarefas;
            },
            [ADICIONA_TAREFA](state, tarefa: ITarefa) {
                state.tarefas.push(tarefa);
            },
            [ALTERA_TAREFA](state, tarefa: ITarefa) {
                const index = state.tarefas.findIndex(t => t.id === tarefa.id);
                state.tarefas[index] = tarefa;
            }
        },
        actions: {
            [OBTER_PROJETOS] ({ commit }) {
                http.get('projetos')
                    .then(response => commit(DEFINIR_PROJETOS, response.data))
            },
            [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
                return http.post('/projetos', {
                    id: new Date().toISOString(),
                    nome: nomeDoProjeto
                })
            },
            [EDITAR_PROJETO] (contexto, projeto: IProjeto) {
                return http.put(`/projetos/${projeto.id}`, projeto)
            },
            [REMOVER_PROJETO] ({ commit }, id: string) {
                http.delete(`/projetos/${id}`)
                    .then(() => commit(EXCLUIR_PROJETO, id))
            },
            [OBTER_TAREFAS] ({ commit }) {
                http.get('tarefas')
                    .then(response => commit(DEFINIR_TAREFAS, response.data))
            },
            [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
                return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
            },
            [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
                return http.put(`/tarefa/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
            },
        }
    }
)

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}