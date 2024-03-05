<template>
    <section class="projetos">
        <h1>Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label class="label" for="nome">Nome do projeto</label>
                <div class="control">
                    <input type="text" class="input" id="nome" placeholder="Nome do projeto" v-model="nomeDoProjeto">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button type="submit" class="button is-primary">Criar projeto</button>
                </div>
            </div>
        </form>

        <table class="table is-fullwidth">
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
            </tr>
        </table>

    </section>
</template>

<script lang="ts">
import IProjeto from '@/interfaces/IProjeto';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Projetos-vue',
    components: {
    },
    data () {
        return {
            nomeDoProjeto: '',
            projetos: [] as IProjeto[],
        }
    },
    methods: {
        salvar () {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: this.nomeDoProjeto,
            }
            this.projetos.push(projeto);
            this.nomeDoProjeto = '';
        },

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

