import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, EDITAR_PROJETO, EXCLUIR_PROJETO } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjeto[];
}

// Copilot, explique o código abaixo:
// O código abaixo cria uma chave de injeção para o Vuex e cria uma instância do Vuex com um estado inicial.
// A chave de injeção é utilizada para injetar o Vuex em componentes Vue.
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
        state: {
            projetos: [

            ],
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
        },
    }
)

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}