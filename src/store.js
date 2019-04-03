import Vue from 'vue'
import Vuex from 'vuex'
import global from './store/global/index'
import usuario from './store/usuario/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    usuario
  },
  debug: true
})
