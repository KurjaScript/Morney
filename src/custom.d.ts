type RecordItem = {
    tags:string[]
    notes:string
    type:string
    amount:number //数据类型 object | string
    createdAT?:Date | undefined //类 / 构造函数
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
    tagList: Tag[],
    createTag:(name:string) =>void
}