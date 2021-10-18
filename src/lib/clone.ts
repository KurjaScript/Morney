//传入什么数据类型，返回什么数据类型
function clone<X>(data : X):X{
    return JSON.parse(JSON.stringify(data));
}

export default clone;