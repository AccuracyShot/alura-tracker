<template>
    <section>
        <h1 class="title-list">Lista de Projetos</h1>

        <RouterLink to="/projetos/novo" class="button">
                    <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span>Novo Projeto</span>
        </RouterLink>

        <table class="table is-fullwidth">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
            </tr>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
                <td>
                    <RouterLink :to=" `/projetos/${projeto.id}` " class="button is-primary">Editar
                        <span>
                            <i></i>
                        </span>
                    </RouterLink>
                    <button class="button is-danger ml-1" @click="excluir(projeto.id)">Excluir</button>
                </td>
            </tr>
        </table>

    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store'; 
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'Lista-vue',
    components: {
    },
    methods: {
        excluir(id: string) {
            this.store.dispatch(REMOVER_PROJETO, id);
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_PROJETOS)
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
});

</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}

.lista {
    margin: 10px 0;
    background-color: aqua;
    padding: 1.25rem;
    border-radius: 5px;
}

.title-list {
    margin-bottom: 1.25rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #363636;
}
</style>
        
        