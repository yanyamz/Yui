import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'

import Home from '@/views/Home.vue'
import Rooms from '@/views/Rooms'
import Avatar from '@/views/Avatar'
import Lobby from '@/views/Lobby'
import NotFound from '@/views/NotFound'

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({ name: 'Home' })
    } else {
        next()
    }
}

const redirectToRoomsIfLoggedIn = (to, from, next) => {
    let user = projectAuth.currentUser
    if (user) {
        next({ name: 'Rooms' })
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: redirectToRoomsIfLoggedIn,
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
    {
        path: '/lobby/:host',
        name: 'Lobby',
        props: true,
        component: Lobby,
        beforeEnter: requireAuth,
    },
    { path: '/:notFound(.*)', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
