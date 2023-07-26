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
          <div v-for="(todo, index) in toDoList" :key="index"  class="mt-4 p-2 rounded-md bg-purple-50">
            <TodoList :toDo="todo" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoList from './TodoList.vue';
import { ref, onMounted, computed, watch } from 'vue';

const toDo = ref('');
const toDoList = ref([]);
const editTodo = ref(null);
const error = ref({
  emptyTodo: '',
  duplicate: ''
})

// SORTING TO DO LIST
// const sortedTodoList = computed(() => [...toDoList.value].sort((a, b) => {
//   return b.createdAt - a.createdAt;
// }))


// ADD TO DO
const submitToDo = () => {
  if(toDo.value.trim() !== ''){
      toDoList.value.push({
        item: toDo.value,
        completed: false,
        createdAt: new Date().getTime()
      })
      toDo.value = ''
    }
}


// SAVE TO DO LIST IN LOCAL STORAGE
watch(toDoList, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {deep: true})


onMounted(() => {
  toDoList.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<style scoped>
.checkbox-bg {
  accent-color: rgb(85, 9, 85);
}
</style>