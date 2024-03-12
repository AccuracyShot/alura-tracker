<template>
    <div class="notificacoes">
        <article class="message"
        v-for="notificacao in notificacoes"
        :key="notificacao.id"
        :class="contexto[notificacao.tipo]">
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'Notificacao-vue',
    data () {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger',
            }
        }
    },
    components: {
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes),
        }
    }
});
</script>


<style scoped>
.notificacoes {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1000;
}
</style>