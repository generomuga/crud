<template>
  <div class="hello">
      <form @submit.prevent="addTodo">
            <h1>{{ msg }}</h1>
            <div>
                <div>{{ task_header }}</div>
                <input type="text" id="task" v-model="formData.task" />
            </div>
            
            <div>
                <div>{{ comment_header }}</div>
                <textarea id="comment" name="comment" rows="4" cols="20" v-model="formData.comment"/>
            </div>

            <div>
                <button>Yeah! just add a new task</button>
            </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TestComponent',
  props: {
    msg: String,
    task_header: String,
    comment_header: String
  },
  data() {
      return {
          formData: {
              id: '',
              task: '',
              comment: ''
          }
      }
  },
  methods: {
      addTodo() {
        axios
            .post('http://localhost:3000/todos', this.formData)
            .then(response => console.log(response))
            .catch(error => console.log(error))
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
