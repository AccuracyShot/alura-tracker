<template>
    <section class="projetos">
        <h1>Projetos</h1>

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
                    <RouterLink :to="' /projetos/${projeto.id} '" class="button is-primary">Editar
                        <span>
                            <i></i>
                        </span>
                    </RouterLink>
                </td>
            </tr>
        </table>

    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store'; 

export default defineComponent({
    name: 'Projetos-vue',
    components: {
    },
    setup() {
        const store = useStore();
        return {
            projetos: computed(() => store.state.projetos),
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
</style>
        
        