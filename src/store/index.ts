import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projetos";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoTarefa, tarefa } from "./modulos/tarefas";

export interface Estado {
    tarefa: EstadoTarefa,
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
        state: {
            notificacoes: [],
            tarefa: {
                tarefas: []
            },
            projeto: {
                projetos: [],
            }
        },
        mutations: {
            [NOTIFICAR](state, novaNotificacao: INotificacao) {
                novaNotificacao.id = new Date().getTime();
                state.notificacoes.push(novaNotificacao);

                setTimeout(() => {
                    state.notificacoes = state.notificacoes.filter(n => n.id !== novaNotificacao.id);
                }, 3000);
            },
        },
        actions: {

        },
        modules: {
            projeto,
            tarefa
        }
    }
)

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}