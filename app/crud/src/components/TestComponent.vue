<template>
    <div class="hello">

        <form @submit.prevent="addTodo">
            
            <h1>{{ app_title }}</h1>
            
            <div>
                <div>
                    {{ task_header }}
                </div>
                <div>
                    <input type="text" id="task" v-model="formData.task" />
                </div>
            </div>
            
            <div>
                <div>
                    {{ comment_header }}
                </div>
                <div>
                    <textarea id="comment" name="comment" rows="4" cols="22" v-model="formData.comment"/>
                </div>
            </div>

            <div>
                <button>Yeah! just add a new task</button>
            </div>
    
        </form>

        <div>

            <div>
                <br><br>
                Hey! This is my TODOs
                <br><br>
            </div>

            <div>

                <table style="margin-left:auto; margin-right:auto">
                    <tr>
                        <th style="width:100px">ID</th>
                        <th style="width:100px">TASK</th>
                        <th style="width:100px">COMMENT</th>
                        <th style="width:100px">ACTION</th>
                    </tr>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td>{{todo.id}}</td>
                        <td>{{todo.task}}</td>
                        <td>{{todo.comment}}</td>
                        <td><button @click="deleteTodo(todo.id)">Remove this I'm lazy today</button></td>
                    </tr>
                </table>

            </div>

            <div>
                <h3 v-if="errorMsg">{{errorMsg}}</h3>
            </div>
            
        </div>

    </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'TestComponent',
  props: {
    app_title: String,
    task_header: String,
    comment_header: String
  },
  created() {
      this.getTodo()
  },
  data() {
      return {
          formData: {
              id: '',
              task: '',
              comment: '',
              
          },
          todos: [],
          errorMsg: ''
      }
  },
  methods: {
      addTodo() {
        if (this.formData.task === '' || this.formData.comment === ''){
            this.errorMsg = '*Task and comment are required fields'
            return
        }
        axios
            .post('http://localhost:3000/todos', this.formData)
            .then((response) => {
                console.log(response)
                this.errorMsg = ''
                this.getTodo()
            })
            .catch(error => console.log(error))
      },
      getTodo(){
          axios
            .get('http://localhost:3000/todos')
            .then((response) => {
                console.log(response)
                this.todos = response.data
            })
            .catch((error) => {
                console.log(error)
                this.errorMsg = 'Error on retrieving data'
            })
      },
      deleteTodo(todoId){
          axios
            .delete('http://localhost:3000/todos/'+todoId)
            .then((response) => {
                console.log(response)
                this.todos.splice(todoId, 1);
                this.getTodo()
            })
            .catch((error) => {
                console.log(error)
                this.errorMsg = 'Error on retrieving data'
            })
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
