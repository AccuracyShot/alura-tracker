<template>
  <header>
      <h1>
        <img src="../assets/logo.png" alt="">  
      </h1>
      <div>
        <button class="button" @click="alterarTema">
          {{ textoBotao }}
        </button>
      </div>
      <nav class="painel-links">
        <ul>
          <li class="button is-info">
            <RouterLink class="link" to="/">Tarefas</RouterLink>
          </li>
          <li class="button is-info">
            <RouterLink class="link" to="/projetos">Projetos</RouterLink>
          </li>
        </ul>
      </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data () {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoBotao () {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  methods: {
    alterarTema () {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.painel-links {
  margin-top: 2rem;
}

.painel-links ul li {
  display: block;
  margin-bottom: 10px;
}

.link {
  color: #fff;
}

.link:hover {
  color: #4bfb00;
}

.link.router-link-active {
  color: #4bfb00;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>