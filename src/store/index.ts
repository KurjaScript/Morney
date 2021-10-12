import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'

Vue.use(Vuex)  //把store绑到Vue.prototype


const store = new Vuex.Store({
  state: {// data
    recordList:[] as RecordItem[]
  },
  mutations: { //methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state,record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAT = new Date();
      state.recordList.push(record2);
      console.log(state.recordList)
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
});

export default store
