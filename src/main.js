import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/less/index.less'
import axios from 'axios'
import './api/mock.js'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button,
  Table,
  TableColumn,
  Row,
  Col,
  Card,
  Collapse,
  CollapseItem,
  Container,
  Header,
  Aside,
  Main,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Pagination)
Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message  = Message

router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  }
})
