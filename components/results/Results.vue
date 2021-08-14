<template>
  <div>
    <b-button class="mb-3" size="sm" variant="secondary" @click="create()">Add</b-button>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <Select2 v-model="filters.student" :options="u_students" :settings="{ multiple:false, maximumSelectionLength:3 }" @change="getResults()" placeholder="select student"/>
        </b-col>
        <b-col>
          <Select2 v-model="filters.department" :options="departments" :settings="{ multiple:false, maximumSelectionLength:3 }" @change="getResults()" placeholder="select department"/>
        </b-col>
        <b-col>
          <b-form-select v-model="filters.gpa" :options="gpa_options" size="sm"></b-form-select>
        </b-col>
        <b-col>
          <b-button size="sm" variant="info" @click="getResults()">filter</b-button>
          <b-button size="sm" variant="success" @click="resetList()">reset</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-table striped hover :items="results" :fields="fields">
      <template v-slot:cell(published)="items">
        {{ items.value | dateFormat }}
      </template>
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
        student:null,
        department:null,
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
      this.filters.student = null,
      this.filters.department = null,
      this.filters.gpa = null
      this.getResults()
    },
    create(){
      this.$refs.manResult.createResult()
    },

    edit(id){
      this.$refs.manResult.editResult(id)
    },

    res_delete(id){
      this.$refs.manResult.deleteResult(id)
    }
  },
  created(){
    this.getResults();
    this.loadStudents()
    this.loadDepartments()
    this.loadGpa()
  }
}
</script>

<style scoped>

</style>
