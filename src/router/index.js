import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'

import Home from '@/views/Home.vue'
import Rooms from '@/views/Rooms'
import Avatar from '@/views/Avatar'

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({ name: 'Home' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/rooms',
        name: 'Rooms',
        component: Rooms,
        beforeEnter: requireAuth,
    },
    {
        path: '/avatar',
        name: 'Avatar',
        component: Avatar,
        beforeEnter: requireAuth,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
