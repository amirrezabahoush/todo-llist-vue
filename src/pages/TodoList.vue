<template>
  <div class="mt-10 lg:max-w-4xl mx-5 lg:mx-auto">
    <h1 class="text-left !font-bold mb-5 mx-2">Todo List</h1>
    <div class="flex flex-col items-start my-4">
      <label class="leading-loose">Status</label>
      <select v-model="filter"
        class="h-12 w-full bg-transparent px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <table class="w-full table-auto">
      <thead>
        <tr class="border-b-2">
          <th class="p-2 text-left">Title</th>
          <th class="p-2 text-center">Completed</th>
          <th class="p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2" v-for="todo in $store.getters.todoList" v-bind:key="todo.id">
          <td class="p-2 text-left" :class="{ 'text-red-600': Date.now() > todo.expirationDate }">
            {{ todo.title }}
          </td>
          <td class="p-2 text-center">
            <img v-if="todo.completed" :src="CheckIcon" class="bi bi-check !inline" />
            <img v-if="!todo.completed" :src="RemoveIcon" class="bi bi-x !inline cursor-pointer"
              @click="handleChangeStatus(todo)" />
          </td>
          <td class="p-2 text-center">
            <div class="todo-actions">
              <router-link v-bind:to="`/todo/${todo.id}`" exact>
                <span class="icon px-1 cursor-pointer"> Edit </span>
              </router-link>
              <span class="icon px-1 cursor-pointer" v-on:click="handleRemoveClick(todo.id)"> Remove </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CheckIcon from '@/assets/images/check-icon.svg';
import RemoveIcon from '@/assets/images/remove-icon.svg';
import { randomDate } from '@/utils/index';

export default {
  name: 'app',
  data() {
    return {
      CheckIcon,
      RemoveIcon
    }
  },
  methods: {
    handleRemoveClick(id) {
      const result = confirm('Are you sure?');
      if (result) {
        this.$store.dispatch('removeTodo', id);
      }
    },
    handleChangeStatus(todo) {
      this.$store.dispatch('changeStatus', todo);
    }
  },
  created() {
    if (!this.$store.getters.todoList.length) {
      this.$http.get('https://jsonplaceholder.typicode.com/todos').then(function (response) {
        const data = response.body.map(item => ({ ...item, expirationDate: randomDate() }));
        this.$store.dispatch('getTodo', data);
      });
    }
  },
  computed: {
    filter: {
      get() {
        return this.$store.state.completedFilter
      },
      set(value) {
        this.$store.dispatch("setFilter", value);
      }
    },
    today() {
      return new Date().getTime()
    }
  },
  mixins: ['randomDate']
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>