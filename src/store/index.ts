import { EstadoProjeto, projeto } from './modulos/projetos/index';
import ITarefa from '@/interfaces/ITarefa';
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from '@/http'

export interface Estado {
    tarefas: ITarefa[];
    notificacoes: INotificacao[];
    projeto: EstadoProjeto; 
}

// Copilot, explique o código abaixo:
// O código abaixo cria uma chave de injeção para o Vuex e cria uma instância do Vuex com um estado inicial.
// A chave de injeção é utilizada para injetar o Vuex em componentes Vue.
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
        state: {
            notificacoes: [],
            tarefas: [],
            projeto: {
                projetos: [],
                notificacoes: []
            },
        },
        mutations: {
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
            [OBTER_TAREFAS] ({ commit }, filtro: string) {
                let url = 'tarefas'

                if (filtro) {
                    url += '?descricao=' + filtro
                }

                http.get(url)
                    .then(response => commit(DEFINIR_TAREFAS, response.data))
            },
            [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
                return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
            },
            [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
                return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
            },
        },
        modules: {
            projeto
        }
    }
)

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}