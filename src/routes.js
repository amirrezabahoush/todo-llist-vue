import TodoList from './pages/TodoList.vue';
import TodoActions from './pages/TodoActions.vue';

export default [
  { path: '/', component: TodoList },
  { path: '/todo/add', component: TodoActions },
  { path: '/todo/:id', component: TodoActions },
  { path: '/todo/duplicate/:id', component: TodoActions }
]
