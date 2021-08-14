<template>
  <div>
    <b-button class="mb-3" size="sm" variant="secondary" @click="create()">Add</b-button>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form-input size="sm" v-model="filters.name" placeholder="name"></b-form-input>
        </b-col>
        <b-col>
          <Select2 v-model="filters.department" :options="departments" :settings="{ multiple:false, maximumSelectionLength:3 }" @change="getStudents()" placeholder="select department"/>
        </b-col>
        <b-col>
          <Select2 v-model="filters.batch" :options="batches" :settings="{ multiple:false, maximumSelectionLength:3 }" @change="getStudents()" placeholder="select batch"/>
        </b-col>
        <b-col cols="1">
          <b-form-input v-model="filters.gpa_min" type="range" min="0" max="5" step="0.1"></b-form-input>
          min gpa : {{ filters.gpa_min }}
        </b-col>

        <b-col cols="1">
          <b-form-input v-model="filters.gpa_max" type="range" min="0" max="5" step="0.1"></b-form-input>
          max gpa : {{ filters.gpa_max }}
        </b-col>
        <b-col cols="2">
          <b-form-select v-model="filters.gpa" :options="gpa_options" size="sm"></b-form-select>
        </b-col>
        <b-col>
          <b-button size="sm" variant="info" @click="getStudents()">filter</b-button>
          <b-button size="sm" variant="success" @click="resetList()">reset</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-table striped hover :items="students" :fields="fields">
      <template v-slot:cell(id)="items">
        <b-button squared size="sm" variant="outline-danger" @click="stu_delete(items.value)" >delete</b-button>
        <b-button squared size="sm" variant="outline-info" @click="edit(items.value)">edit</b-button>
      </template>
    </b-table>
    <ManageStudent ref="manStudent" @managed="resetList()"></ManageStudent>
  </div>
</template>

<script>
import ManageStudent from "./ManageStudent";
import _ from 'lodash'
import utility from "~/mixins/utility";
export default {
  name: "Students",
  components:{ManageStudent},
  data(){
    return {
      students:[],
      filters:{
        name:null,
        batch:null,
        department:null,
        gpa_max:null,
        gpa_min:null,
        gpa:null
      },
      fields:[
        {key:'name', label:'Name'},
        {key:'department_name', label:'Department'},
        {key:'batch_name', label:'Batch'},
        {key:'gpa', label:'Result'},
        {key:'id', label:'Action'},
      ]
    }

  },
  mixins:[utility],
  methods:{
    getStudents(){
      let that = this;
      this.$axios.get('/students', { params: that.filters }).then((response) =>{
        that.students = response.data.data
      })
    },
    resetList(){
      this.filters.name = null,
      this.filters.batch = null,
      this.filters.department = null,
      this.filters.gpa_max = null,
      this.filters.gpa_min = null,
      this.filters.gpa = null
      this.getStudents()
    },
    create(){
      this.$refs.manStudent.createStudent()
    },

    edit(id){
      this.$refs.manStudent.editStudent(id)
    },

    stu_delete(id){
      this.$refs.manStudent.deleteStudent(id)
    }
  },
  created(){
    this.getStudents();
    this.loadBatches()
    this.loadDepartments()
    this.loadGpa()
  }
}
</script>

<style scoped>

</style>
