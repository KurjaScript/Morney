import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
    ...recordStore,
    ...tagStore,
};

export default store

//我就试一试