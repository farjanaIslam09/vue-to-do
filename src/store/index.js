import { createStore } from 'vuex';

const store = createStore({
    state: {
        toDos: [],
        toDo: ''
    }
})

export default store;