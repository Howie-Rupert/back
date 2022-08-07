import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main'
import Home from '../pages/home/index'
import User from '../pages/user/index'
import Mall from '../pages/mall/index'
import PageOne from '../pages/other/PageOne'
import PageTwo from '../pages/other/PageTwo'
import Login from '../pages/Login/index'
Vue.use(VueRouter)
export default new VueRouter({
    //默认模式hash
    routes:[
        {
            path:'/',
            name:'main',
            component:Main,
            // redirect:'/home',
            children:[
                {
                    path:'/home',
                    name:'home',
                    component:Home,  
                },
                {
                    path:'/user',
                    name:'user',
                    component:User,  
                },
                {
                    path:'/mall',
                    name:'mall',
                    component:Mall,  
                },
                {
                    path:'/page1',
                    name:'page1',
                    component:PageOne,  
                },
                {
                    path:'/page2',
                    name:'page2',
                    component:PageTwo,  
                },
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        }
    ]
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}