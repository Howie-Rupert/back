// import router from '@/router'
import Cookie from 'js-cookie'
export default{
    state:{
        isCollapse:false,
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home'
            },
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        CollapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,value){
            if(value.name !== 'home'){
                state.currentMenu = value
                const res = state.tabsList.findIndex(item => item.name === value.name)
                if(res === -1){
                    state.tabsList.push(value)
                }
            }else{
                state.currentMenu = null
            }
        },
        closeTag(state,value){
            const res =  state.tabsList.findIndex(item => item.name === value.name)
            state.tabsList.splice(res,1)
        },
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = ''
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../pages/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../pages/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由动态添加
            menuArray.forEach(item => {
                router.addRoute('main',item)
            })
        }
    }
}