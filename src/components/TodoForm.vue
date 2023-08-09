<template>
  <div class="h-screen w-full pt-10 bg-gray-100">
    <div class="w-1/3 mx-auto h-auto bg-white rounded-md shadow p-5">
      <h2 class="text-3xl font-medium text-center pb-3 border-b">To Do List</h2>
      <div class="mt-4 pb-3">
        <form @submit.prevent="addTask" class="flex items-center pb-1">
          <input v-model.trim="task" type="text" class="w-full border rounded-md px-3 py-2 focus:none outline-none" placeholder="Enter your to do list">
          <input type="submit"  class="ml-2 bg-purple-900 text-white rounded-md py-2 px-4 cursor-pointer" value="Add">
        </form>
        <div>
          <p v-if="error.emptyTodo" class="text-red-600 pb-4">{{ error.emptyTodo }}</p>
          <p v-if="error.duplicate" class="text-red-600 pb-4">{{ error.duplicate }}</p>
        </div>
        <template v-if="toDoList.length">
          <TodoList 
            v-for="(todo, index) in toDoList" 
            :key="todo.id" 
            :toDo="todo" 
            :index="index" 
            @update-todo="editTodo" 
            @delete-todo="deleteTodo"  
            class="mt-4 p-2 rounded-md bg-purple-50" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import TodoList from './TodoList.vue';
import { ref, computed, watch } from 'vue';

const store = useStore()

const toDoList = computed(() => {
  return store.getters.getToDos
})


const task = ref('');
const editTaskId = ref(null)
const error = ref({
  emptyTodo: '',
  duplicate: ''
})

const getDuplicateItem = computed(() => {
  let duplicate = toDoList.value.find(td => td.task.toLowerCase() === task.value.toLowerCase())
  return duplicate;
})


const addTask = () => {
  if(task.value === ''){
    error.value.emptyTodo = 'Please enter a value'
  }else{
  // CHECKING DUPLICATE ITEM
  if(getDuplicateItem.value){
    return
  }

  if(editTaskId.value !== null){
    // UPDATE TO DO
    const updatedTask = {
      id: editTaskId.value,
      task: task.value
    }
      store.dispatch("updateToDo", updatedTask);
      editTaskId.value = null
    }else{
      // ADD TO DO
      store.dispatch("addToDo", task.value);
    }
    task.value = ''
  }
   
}


const deleteTodo = (id) => {
  store.dispatch("deleteToDo", id)
}
const editTodo = (index) => {
  task.value = toDoList.value[index].task
  editTaskId.value = toDoList.value[index].id
}
// SETTING ERROR
watch(task, newVal => {
  if(newVal) {
    if(task.value !== ''){
      error.value.emptyTodo = ''
    }
    if(getDuplicateItem.value && editTaskId.value === null){
      error.value.duplicate = 'Task is already added in the list'
    }else {
      error.value.duplicate = ''
    }
  }
})

</script>

<style>
.checkbox-bg {
  accent-color: rgb(85, 9, 85);
}
</style>