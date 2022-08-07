import Vue from 'vue'
import Vuex from 'vuex'
import tab from './Tab'
import user from './user'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        tab,
        user
    }
})