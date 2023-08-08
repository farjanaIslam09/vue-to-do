import { createStore } from 'vuex';
import * as todos from './todos.js'

const store = createStore({
    state: todos.state,
    getters: todos.getters,
    mutations: todos.mutations,
    actions: todos.actions
})

export default store;