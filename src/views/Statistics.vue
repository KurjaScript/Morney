<template>
  <Layout>
    <Tabs class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"/>
      <ol v-if="groupedList.length > 0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
              {{item.id}}
             <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>

  </Layout>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone'

  const  api = dayjs();
  console.log(api)


  @Component({
    components:{Tabs},
  })
  export default class Statistics extends Vue{
    tagString(tags: Tag[]){
      return tags.length === 0? '无' : tags.map(t => t.name).join('，')
    }
    beautify(string: string){
      const day = dayjs(string)
      const now = dayjs()
      if(dayjs(string).isSame(now,'day')){
        return '今天'
      }else if(dayjs(string).isSame(now.subtract(1, 'day'),'day')){
        return '昨天'
      }else if(dayjs(string).isSame(now.subtract(2, 'day'),'day')){
        return '前天'
      }else if(day.isSame(now, 'year')){
        return day.format('M月D日')
      } else{
        return day.format('YYYY年M月D日')
      }
    }
    get recordList(){
      return (this.$store.state as RootState).recordList;
    }

    get groupedList(){
      const {recordList} = this;
      if(recordList.length === 0){return []}
      const newList = clone(recordList)
          .filter(r => r.type === this.type)
          .sort((a, b) => dayjs(b.createdAT).valueOf() - dayjs(a.createdAT).valueOf());
      type Result = {title: string, total?: number, items: RecordItem[]}[]
      const result: Record = [{title: dayjs(newList[0].createdAT).format('YYYY-M-D'), items:[newList[0]]}]
      for (let i = 1; i < newList.length; i++){
        const current = newList[i];
        const last =  result[result.length - 1];
        if(dayjs(last.title).isSame(dayjs(current.createdAT),'day')){
          last.items.push(current)
        }else{
          result.push({title: dayjs(current.createdAT).format('YYYY-M-D'),  items: [current]});
        }
      }
      console.log('------');
      //把forEach换为map，map是一个有返回值的forEach
      result.map(group =>{
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
      });
      return result;


    }

    beforeCreate(){
      this.$store.commit('fetchRecords')
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang="scss">
.noResult{
  padding:16px;
  text-align:center;
}
::v-deep .type-tabs-item{
  background:#C4C4C4;
  &.selected{
    background: white;
    &::after{
      display: none;
    }
  }
}
::v-deep .interval-tabs-item{
  height:48px;
}

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

