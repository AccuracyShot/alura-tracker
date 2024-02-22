<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Box-vue',

});

</script>

<style scoped>
    .box {
        background: #abd1f5;
        margin-top: 1.25rem;
    }
</style>