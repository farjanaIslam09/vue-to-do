export const state = {
    toDos: []
}

export const getters = {
    getToDos: state => state.toDos
}

export const mutations = {
    ADD_TODO: (state, payload) => {
        let taskId = "id" + Math.random().toString(16).slice(2)
        const newTask = {
            id:taskId,
            task: payload,
            completed: false,
            createdAt: new Date().getTime()
        }
        state.toDos.unshift(newTask)
    },
    UPDATE_TODO: (state, payload) => {
       let findItem = state.toDos.find(todo => todo.id === payload.id)
       findItem.task = payload.task
    },
    DELETE_TODO: (state, payload) => {
        const index = state.toDos.findIndex(todo => todo.id === payload)
        state.toDos.splice(index, 1)
    },
}

export const actions = {
    addToDo: (context, payload) => {
        context.commit("ADD_TODO", payload)
    },
    updateToDo: (context, payload) => {
        context.commit("UPDATE_TODO", payload)
    },
    deleteToDo: (context, payload) => {
        context.commit("DELETE_TODO", payload)
    },
}