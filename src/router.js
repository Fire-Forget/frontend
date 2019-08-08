import Vue from 'vue';
import Router from 'vue-router';

//引入页面
import Tip404 from './pages/error/404';
//layout
import MainLayout from './layout/mainLayout';
//pages
import Home from './pages/home'


Vue.use(Router)
const router = new Router({
    mode:"history",
    routes:[{
        path:'/',
        component:MainLayout,
        children:[
            {
                path:'home',
                name:'home',
                component:Home
            }
        ]
    },
    {
        path:'/404',
        name:'tip404',
        component: Tip404
    },
    {//其余页面皆跳转至404
        path: '*',
        redirect : '/404'
    }
],
})

export default router;