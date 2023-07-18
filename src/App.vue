<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const toDo = ref('');
const toDoList = ref([]);
const itemId = ref(0)
const editTodo = ref(null);
const error = ref({
  emptyTodo: '',
  duplicate: ''
})

// SORTING TO DO LIST
const sortedTodoList = computed(() => [...toDoList.value].sort((a, b) => {
  return b.createdAt - a.createdAt;
}))

const getDuplicateItem = computed(() => {
  let duplicate = toDoList.value.find(td => td.item.toLowerCase() === toDo.value.toLowerCase())
  return duplicate;
})

// ADD TO DO
const submitToDo = () => {
  // SAVE NEW TO DO
  if(editTodo.value === null && !getDuplicateItem.value){
    if(toDo.value.trim() !== ''){
      toDoList.value.push({
        id: itemId.value += 1,
        item: toDo.value,
        completed: false,
        createdAt: new Date().getTime()
      })
      toDo.value = ''
    }else {
      error.value.emptyTodo = 'Please enter a value'
    }
  }

  // CHECKING DUPLICATE ITEM
  if(getDuplicateItem.value){
    return
  }

  // TO SAVE UPDATED TO DO
  if (editTodo.value !== null){
  const items = sortedTodoList.value.find(td => td.id === editTodo.value)
  items.item = toDo.value
  editTodo.value = null
  toDo.value = ''
  return
  }
  
}

// SETTING ERROR
watch(toDo, newVal => {
  if(newVal) {
    if(toDo.value !== ''){
      error.value.emptyTodo = ''
    }
    if(getDuplicateItem.value && editTodo.value === null){
      error.value.duplicate = 'Task is already added in the list'
    }else {
      error.value.duplicate = ''
    }
  }
})

// SAVE TO DO LIST IN LOCAL STORAGE
watch(toDoList, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {deep: true})


const updateTodo = (index) => {
  toDo.value = sortedTodoList.value[index].item
  editTodo.value = sortedTodoList.value[index].id
}

const deleteTodo = (item) => {
  toDoList.value = toDoList.value.filter(todo => todo != item)
}

onMounted(() => {
  toDoList.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
  <div class="h-screen w-full pt-10 bg-gray-100">
    <div class="w-1/3 mx-auto h-auto bg-white rounded-md shadow p-5">
      <h2 class="text-3xl font-medium text-center pb-3 border-b">To Do List</h2>
      <div class="mt-4 pb-3">
        <form @submit.prevent="submitToDo" class="flex items-center pb-1">
          <input v-model.trim="toDo" type="text" class="w-full border rounded-md px-3 py-2 focus:none outline-none" placeholder="Enter your to do list">
          <input type="submit"  class="ml-2 bg-purple-900 text-white rounded-md py-2 px-4 cursor-pointer" value="Add">
        </form>
        <div>
          <p v-if="error.emptyTodo" class="text-red-600 pb-4">{{ error.emptyTodo }}</p>
          <p v-if="error.duplicate" class="text-red-600 pb-4">{{ error.duplicate }}</p>
        </div>
        <template v-if="toDoList.length">
          <div v-for="(todo, index) in sortedTodoList" :key="index"  class="mt-4 p-2 rounded-md bg-purple-50">
            <div class="flex justify-between items-center">
              <div class="flex gap-2 items-center">
                <div>
                  <input type="checkbox" v-model="todo.completed" class="checkbox-bg">
                </div>
                <p class="font-medium text-sm capitalize" :class="todo.completed && 'opacity-40'">{{ todo.item }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="updateTodo(index)" :disabled="todo.completed">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" :class="todo.completed && 'opacity-20'">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                </button>
                <button @click="deleteTodo(todo)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-bg {
  accent-color: rgb(85, 9, 85);
}
</style>



