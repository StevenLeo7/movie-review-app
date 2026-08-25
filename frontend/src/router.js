import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import MovieList from './views/MovieList.vue';
import MovieDetail from './views/MovieDetail.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/', component: MovieList, meta: { requiresAuth: true } },
    { path: '/movie/:id', component: MovieDetail, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuth = !!localStorage.getItem('token');
    
    if (to.meta.requiresAuth && !isAuth) {
        next('/login');
    } else {
        next();
    }
});

export default router;