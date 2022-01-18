<template>
  <div class="text-2xl">🚀 Todo App Live 🚀</div>
  <div v-for="todo in todos" v-bind:key="todo.id" class="m-1">
    <div class="flex flex-row justify-center">
      <div class="text-2xl px-2">
        {{ todo.data }}
      </div>
      <button @click="removeTodo(todo.id)">❌</button>
    </div>
  </div>
  <div>
    <input type="text" v-model="todo" placeholder="Add todo..." />
    <button @click="addTodo()" class="bg-green-500 rounded p-1 m-1">add</button>
    <button @click="clearAllTodos" class="bg-red-500 rounded p-1">clear</button>
  </div>
</template>

<script>
import '@/assets/styles/index.css';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      todo: '',
      todos: [
        {
          id: Math.random() * 10000,
          data: 'hello',
        },
        {
          id: Math.random() * 10000,
          data: '️world',
        },
        // {
        //   id: Math.random() * 10000,
        //   data: 'like 👍',
        // },
        // {
        //   id: Math.random() * 10000,
        //   data: '&',
        // },
        // {
        //   id: Math.random() * 10000,
        //   data: 'sub ❤️',
        // },
      ],
    };
  },
  methods: {
    addTodo() {
      if (this.todo.length === 0) {
        alert('be sure to write some todo');
      } else {
        this.todos.push({
          id: Math.random() * 10000,
          data: this.todo,
        });
        this.todo = '';
      }
    },
    removeTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
    clearAllTodos() {
      this.todos = [];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
