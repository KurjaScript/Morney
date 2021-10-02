const localStorageKeyName = 'recordList';
const model = {
    //获取数据
    fetch(){
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    },
    //保存数据
    save(data){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(data));
    },
}

export {model}