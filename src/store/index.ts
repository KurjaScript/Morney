import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //把store绑到Vue.prototype

const store = new Vuex.Store({
  state: {// data
    count: 0
  },
  mutations: { //methods
    increment (state, n: number){
      state.count += n;
    }
  },
  actions: {
  },
  modules: {
  }
})
console.log(store.state.count);
store.commit('increment', 0)//type：函数名，payload：参数
console.log(store.state.count)

export default store
