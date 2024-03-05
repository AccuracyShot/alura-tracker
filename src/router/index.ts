import Tarefas from "@/views/Tarefas.vue";
import Projetos from "@/views/Projetos.vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import Contato from "@/views/Contato.vue";


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
    {
        path: '/contato',
        name: 'Contato',
        component: Contato
    }

]



const roteador = createRouter({
    history: createWebHistory(),
    routes: rotas
})

export default roteador;