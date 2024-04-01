<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">             
                <div class="control">
                    <input 
                    type="text" 
                    class="input" 
                    id="nome" 
                    placeholder="Nome do projeto" 
                    v-model="nomeDoProjeto">
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
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store'; 
import { TipoNotificacao } from '@/interfaces/INotificacao';
import  useNotificador from '@/hooks/notificador';
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Formulario-vue',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    setup(props) {

        const router = useRouter();

        const store = useStore();
        const { notificar } = useNotificador();
        const nomeDoProjeto = ref('');

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(
                projeto => projeto.id == props.id
            );
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const lidarComSucesso = () => {
            notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', 'Projeto salvo com sucesso');
            nomeDoProjeto.value = '';
            router.push('/projetos');
        }

        const salvar = () => {
            if(props.id) {
                store.dispatch(EDITAR_PROJETO, { 
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => {
                    lidarComSucesso();
                })
            } else {          
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => {
                        lidarComSucesso();
                    })
            }
        }

        return {
            nomeDoProjeto,
            salvar
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
