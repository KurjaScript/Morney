type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag,
}

type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number //数据类型 object | string
    createdAT?: string
}

type Tag = {
    id: string;
    name: string;
}
type tagListModel ={
    data: Tag[];
    fetch: ()=> Tag[]
    create: (name:string) => 'success' | 'duplicated' //success表示成功；duplicated表示name重复
    update:(id: string, name: string) =>'success' | 'not found' | 'duplicated'
    remove:(id:string) => boolean
    save: () => void

}

interface Window{

}