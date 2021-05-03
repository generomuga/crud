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

            <!-- <div>
                <h5 v-if="savingSuccessful">Saved successfully</h5>
            </div> -->

      </form>
      
      <div>
            <div>
                <br><br>
                Hey! This is my TODOs
            </div>
            
            <div>  
                <!-- <button @click="getTodo">Refresh it to see my life</button> -->
                <div v-for="todo in todos" :key="todo.id">
                    {{todo.id}} - {{todo.task}} - {{todo.comment}}
                </div>
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
    msg: String,
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
          errorMsg: '',
          savingSuccessful: false
      }
  },
  methods: {
      addTodo() {
        axios
            .post('http://localhost:3000/todos', this.formData)
            .then((response) => {
                console.log(response)
                this.savingSuccessful = true
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
