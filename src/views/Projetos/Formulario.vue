<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">             
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

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store'; 
import { ADICIONAR_PROJETO, EDITAR_PROJETO } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import  useNotificador from '@/hooks/notificador';

export default defineComponent({
    name: 'Formulario-vue',
    components: {
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    mounted () {
        if(this.id) {
            const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id);
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    data () {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar () {
            if(this.id) {
                this.store.commit(EDITAR_PROJETO, { 
                    id: this.id,
                    nome: this.nomeDoProjeto
                });
            } else {          
                this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto);
            }
            this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', 'Projeto salvo com sucesso');
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        },

    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        return {
            store,
            notificar,
        }
    }
});

</script>

<style scoped>

.lista {
    margin: 10px 0;
    background-color: aqua;
    padding: 1.25rem;
    border-radius: 5px;
}
</style>
