<template>
    <div class="notificacoes">
        <article class="message is-success">
            <div class="message-header">
                Atenção!
            </div>
            <div class="message-body">
                Aqui vai um texto de notificação!
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Notificacao-vue',
    components: {
    },
});
</script>