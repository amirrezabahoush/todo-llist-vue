<template>
  <div>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto xs:max-w-xs sm:w-full">
        <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div class="max-w-md mx-auto">
            <div class="flex items-center space-x-5">
              <span
                class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i</span>
              <h2 class="leading-relaxed block pl-2 font-semibold text-xl self-center text-gray-700">{{
                pageTitle
              }} Todo
              </h2>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex flex-col items-start">
                  <label class="leading-loose">Title</label>
                  <input type="text" v-model="title"
                    class="h-12 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Event title">
                </div>
                <div class="flex flex-col items-start" v-if="this.$route.params.id">
                  <label class="leading-loose">Is Completed</label>
                  <select v-model="isCompleted"
                    class="h-12 w-full bg-transparent px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600">
                    <option v-for="state in [true, false]" :key="state">{{ state }}</option>
                  </select>
                </div>
                <div class="flex flex-col items-start">
                  <label class="leading-loose">Due date</label>
                  <input type="date" v-model="date" :min="today"
                    class="h-12 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Event title">
                </div>
              </div>
              <div class="pt-4 flex items-center space-x-4">
                <button
                  class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  v-on:click="handleSubmit">Submit</button>
                <button
                  class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-gray-200">
                  <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateDate } from '@/utils/index';

export default {
  name: 'TodoActions',
  computed: {
    pageTitle: function () {
      const isDuplicate = this.$route.path.includes('duplicate');
      return isDuplicate ? 'Duplicate' : this.$route.params.id ? 'Edit' : 'Add'
    },
    today() {
      return new Date().toISOString().split('T')[0]
    }
  },
  props: ['isDuplicate'],
  methods: {
    handleSubmit() {
      const { id } = this.$route.params;
      const { isCompleted, title, date } = this;
      if (!title.length) {
        alert('Title field is required!');
      }
      const isDuplicate = this.$route.path.includes('duplicate');
      const payload = id && !isDuplicate ? { title, isCompleted, id, date } : { title, date };
      this.$store.dispatch(id && !isDuplicate ? 'editTodo' : 'addTodo', payload);
      alert(`Todo Item ${isDuplicate ? 'duplicated' : id ? 'updated' : 'created'} successfully.`);
      this.$router.push('/');
    }
  },
  data() {
    const { id } = this.$route.params;
    const item = this.$store.getters.todoList.find(item => item.id === +id);
    return {
      title: id ? item.title : '',
      date: id ? calculateDate(item.expirationDate) : calculateDate(),
      isCompleted: id ? item.completed : false
    }
  },
  watch: {
    $route() {
      this.title = '';
      this.date = calculateDate();
      this.isCompleted = false;
    }
  }
}
</script>
