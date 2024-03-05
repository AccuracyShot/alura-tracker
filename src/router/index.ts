import Tarefas from "@/views/Tarefas.vue";
import Projetos from "@/views/Projetos.vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"


const rotas: RouteRecordRaw[] = [{
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: Projetos        
    },

]



const roteador = createRouter({
    history: createWebHistory(),
    routes: rotas
})

export default roteador;