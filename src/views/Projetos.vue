<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Projetos-vue',
    components: {
    },
    setup() {
        return {
        }
    }
});
</script>

<style scoped>

.title {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}

.projetos {
    padding: 1.25rem;
}
</style>
        