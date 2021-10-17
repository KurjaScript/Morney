<template>
  <Layout>
    <Tabs class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"/>
    <Tabs class-prefix="interval"
         :data-source="intervalList"
         :value.sync="interval"/>

      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
             <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>

  </Layout>
</template>

<style  scoped lang="scss">
  %item{
    padding:8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    @extend %item;
  }
  .record{
    @extend %item;
    background: white;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color:#999
  }
</style>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';


  @Component({
    components:{Tabs},
  })
  export default class Statistics extends Vue{
    tagString(tags: Tag[]){
      return tags.length === 0? '无' : tags.join(',')
    }
    get recordList(){
      return (this.$store.state as RootState).recordList;
    }

    // get result(){
    //   const  {recordList} = this;
    //   type HasTableValue = {title:string, item:RecordList[]}
    //   const hashTable:{[key: string]: HasTableValue} = {};
    //   for(let i = 0; i < recordList.length; i++){
    //     const [data, time] = recordList[i].createdAT!.split('T')
    //     hashTable[data] = hashTable[data] || {title:data, item:[]}
    //     hashTable[data].items.push(recordList[i])
    //   }
    //   return hashTable;
    // }
    get result(){
      const {recordList} = this;
      type Items = RecordItem[];
      type HashTableValue = {title: string, items: Items}

      const hashTable: {[key:string]: HashTableValue} = {};
      for (let i = 0; i < recordList.length; i++){
        const [data, time] = recordList[i].createdAT!.split('T');
        console.log(time)
        hashTable[data] = hashTable[data] || {title: data, items:[]}
        hashTable[data].items.push(recordList[i])
      }
      console.log(hashTable);
      return hashTable;
    }

    beforeCreate(){
      this.$store.commit('fetchRecords')
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item{
  background:white;
  &.selected{
    background: #C4C4C4;
    &::after{
      display: none;
    }
  }
}
::v-deep .interval-tabs-item{
  height:48px;
}
</style>

