<template>
  <div class="h-screen w-full pt-10 bg-gray-100">
    <div class="w-1/3 mx-auto h-auto bg-white rounded-md shadow p-5">
      <!-- <h2 class="text-3xl font-medium text-center pb-3 border-b">To Do List</h2> -->
      <div class="mt-4 pb-3">
        <form @submit.prevent="addTask" class="flex items-center pb-1">
          <input v-model.trim="task" type="text" class="w-full border rounded-md px-3 py-2 focus:none outline-none" placeholder="Enter your to do list">
          <!-- <input type="submit"  class="ml-2 bg-purple-900 text-white rounded-md py-2 px-4 cursor-pointer" value="Add"> -->
        </form>
        <div>
          <!-- <p v-if="error.emptyTodo" class="text-red-600 pb-4">{{ error.emptyTodo }}</p>
          <p v-if="error.duplicate" class="text-red-600 pb-4">{{ error.duplicate }}</p> -->
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
import { ref, onMounted, computed, watch } from 'vue';

const store = useStore()

const toDoList = computed(() => {
  return store.getters.getToDos
})

const task = ref('');
const editTask = ref(null)

const addTask = () => {


  if(toDoList.value.map(todo => todo.item !== task.value)){
    store.dispatch("addToDo", task.value);
  }else{

    const updatedTask = {
      id: editTask.value,
      task: task.value
    }
    // let taskId = toDoList.value.find(todo => todo.id === editTask.value)
    store.dispatch("updateToDo", updatedTask);
  }
  task.value = ''
}

const deleteTodo = (id) => {
  store.dispatch("deleteToDo", id)
}
const editTodo = (index) => {
  task.value = toDoList.value[index].item
  editTask.value = toDoList.value[index].id
}

// const toDoList = ref([]);
// const editTodo = ref(null);
// const error = ref({
//   emptyTodo: '',
//   duplicate: ''
// })

// SORTING TO DO LIST
// const sortedTodoList = computed(() => [...toDoList.value].sort((a, b) => {
//   return b.createdAt - a.createdAt;
// }))

// const getDuplicateItem = computed(() => {
//   let duplicate = toDoList.value.find(td => td.item.toLowerCase() === toDo.value.toLowerCase())
//   return duplicate;
// })


// ADD TO DO
// const submitToDo = () => {
  // SAVE NEW TO DO
  // if(editTodo.value === null && !getDuplicateItem.value){
  //   let itemId = "id" + Math.random().toString(16).slice(2)
  //   if(toDo.value.trim() !== ''){
  //     toDoList.value.push({
  //       id: itemId,
  //       item: toDo.value,
  //       completed: false,
  //       createdAt: new Date().getTime()
  //     })
  //     toDo.value = ''
  //   }else {
  //     error.value.emptyTodo = 'Please enter a value'
  //   }
  // }

  // CHECKING DUPLICATE ITEM
  // if(getDuplicateItem.value){
  //   return
  // }

  // TO SAVE UPDATED TO DO
//   if (editTodo.value !== null){
//   const items = toDoList.value.find(todo => todo.id === editTodo.value)
//   items.item = toDo.value
//   editTodo.value = null
//   toDo.value = ''
//   return
//   }
// }

// SETTING ERROR
// watch(toDo, newVal => {
//   if(newVal) {
//     if(toDo.value !== ''){
//       error.value.emptyTodo = ''
//     }
//     if(getDuplicateItem.value && editTodo.value === null){
//       error.value.duplicate = 'Task is already added in the list'
//     }else {
//       error.value.duplicate = ''
//     }
//   }
// })

// const updateTodo = (index) => {
//   toDo.value = sortedTodoList.value[index].item
//   editTodo.value = sortedTodoList.value[index].id
// }

// const deleteTodo = (item) => {
//   toDoList.value = toDoList.value.filter(todo => todo != item)
// }

// SAVE TO DO LIST IN LOCAL STORAGE
// watch(toDoList, newVal => {
//   localStorage.setItem('todos', JSON.stringify(newVal))
// }, {deep: true})


// onMounted(() => {
//   toDoList.value = JSON.parse(localStorage.getItem('todos')) || []
// })
</script>

<style scoped>
.checkbox-bg {
  accent-color: rgb(85, 9, 85);
}
</style>