import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
    data:[] as RecordItem[],
    create(record: RecordItem){
        const record2: RecordItem = clone(record);
        record2.createdAT = new  Data();
        this.data.push(record2);
    },
    //获取数据
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data
    },
    //保存数据
    save(data:RecordItem[]){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
    },
};

export default recordListModel;