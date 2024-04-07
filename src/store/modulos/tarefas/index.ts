import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUI_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id === tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [EXCLUI_TAREFA](state, id: number) {
            state.tarefas = state.tarefas.filter(p => p.id !== id);
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
        [REMOVER_TAREFA] ({ commit }, id: string) {
            http.delete(`/tarefas/${id}`)
                .then(() => commit(EXCLUI_TAREFA, id))
        }
    }
}