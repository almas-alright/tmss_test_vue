<template>
  <div>
    <b-button class="mb-3" size="sm" variant="secondary" @click="create()">Add</b-button>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form-input size="sm" v-model="filters.name" placeholder="name"></b-form-input>
        </b-col>
        <b-col>
          <Select2 v-model="filters.department" :options="departments" :settings="{ multiple:false, maximumSelectionLength:3 }" @change="getResults()" placeholder="select department"/>
        </b-col>
        <b-col>
          <Select2 v-model="filters.batch" :options="batches" :settings="{ multiple:false, maximumSelectionLength:3 }" @change="getResults()" placeholder="select batch"/>
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
          <b-button size="sm" variant="info" @click="getResults()">filter</b-button>
          <b-button size="sm" variant="success" @click="resetList()">reset</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-table striped hover :items="results" :fields="fields">
      <template v-slot:cell(id)="items">
        <b-button squared size="sm" variant="outline-danger" @click="res_delete(items.value)" >delete</b-button>
        <b-button squared size="sm" variant="outline-info" @click="edit(items.value)">edit</b-button>
      </template>
    </b-table>
    <ManageResult ref="manResult" @managed="resetList()"></ManageResult>
  </div>
</template>

<script>
import ManageResult from "./ManageResult";
import _ from 'lodash'
import utility from "~/mixins/utility";
export default {
  name: "Students",
  components:{ManageResult},
  data(){
    return {
      results:[],
      filters:{
        name:null,
        batch:null,
        department:null,
        gpa_max:null,
        gpa_min:null,
        gpa:null
      },
      fields:[
        {key:'student_name', label:'Student'},
        {key:'department_name', label:'Department'},
        {key:'batch_name', label:'Batch'},
        {key:'gpa', label:'Result'},
        {key:'published', label:'Published'},
        {key:'id', label:'Action'},
      ]
    }
  },
  mixins:[utility],
  methods:{
    getResults(){
      let that = this;
      this.$axios.get('/results', { params: that.filters }).then((response) =>{
        that.results = response.data.data
      })
    },
    resetList(){
      this.filters.name = null,
      this.filters.batch = null,
      this.filters.department = null,
      this.filters.gpa_max = null,
      this.filters.gpa_min = null,
      this.filters.gpa = null
      this.getResults()
    },
    create(){
      this.$refs.manResult.createStudent()
    },

    edit(id){
      this.$refs.manResult.editStudent(id)
    },

    res_delete(id){
      this.$refs.manResult.deleteStudent(id)
    }
  },
  created(){
    this.getResults();
    this.loadBatches()
    this.loadDepartments()
    this.loadGpa()
  }
}
</script>

<style scoped>

</style>
