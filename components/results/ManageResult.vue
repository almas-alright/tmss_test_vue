<template>
  <div>
    <b-modal id="results-modal" onclose="resetForm()" no-close-on-backdrop hide-backdrop content-class="shadow" :title="modalTitle">

      <div role="group">
        <label for="input-live">Name:</label>
        <Select2 v-model="result.student_id" :options="u_students" :settings="{ multiple:false, maximumSelectionLength:3 }" placeholder="select student"/>
        <div class="invalid-feedback" v-if="lv_errors.student_id">{{ lv_errors.student_id[0] }}</div>

      </div>
      <div role="group">
        <label>Gpa: {{ result.gpa }}</label>
        <b-form-input v-model="result.gpa" type="range" min="0" max="5" step="0.1"></b-form-input>
      </div>
      <div class="text-danger" v-if="lv_errors.department_id">{{ lv_errors.department_id[0] }}</div>
      <div role="group">
        <label>Published:</label>
        <b-form-datepicker v-model="result.published" id="datepicker-sm" size="sm" locale="en" class="mb-2"></b-form-datepicker>
      </div>
      <div class="text-danger" v-if="lv_errors.batch_id">{{ lv_errors.batch_id[0] }}</div>
      <template v-slot:modal-footer>
        <b-button class="mt-3" @click="$bvModal.hide('results-modal')" size="sm">cancel</b-button>
        <b-button v-if="edit" class="mt-3" @click="updateResult(result_id)" size="sm" variant="info">update</b-button>
        <b-button v-if="!edit" class="mt-3" @click="storeResult()" size="sm" variant="success">save</b-button>
      </template>

    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import utility from "~/mixins/utility";
export default {
  name: "ManageStudent",
  data(){
    return {
      result_id:null,
      result:{ student_id:null, gpa:0, published:null },
      edit:false,
      modalTitle: '',
    }

  },
  mixins:[utility],
  methods:{
    getStudent(id){
      let that = this;
      this.$axios.get('/results/'+id).then((response) =>{
        let data = response.data.data
        that.result.student_id = data.student_id
        that.result.gpa = data.gpa
        that.result.published = data.published
      })
    },
    deleteResult(id){
      let that = this;
      this.$axios.delete('/results/'+id).then((response) =>{
        if(response.data.success){
          that.$emit('managed')
        }
      })
    },
    createResult(){
      this.edit = false
      this.modalTitle = 'Create Student'
      this.$bvModal.show('results-modal')
    },
    storeResult(){
      let that = this;
      this.$axios.post('/results', that.result).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('results-modal')
          that.$emit('managed')
        }
      }).catch((e)=>{

      })
    },
    editResult(id){
      this.getStudent(id)
      this.result_id = id
      this.edit = true
      this.modalTitle = 'Edit Student'
      this.$bvModal.show('results-modal')
    },
    updateResult(id){
      let that = this;
      this.$axios.patch('/results/'+id, that.result).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('results-modal')
          that.$emit('managed')
        }
      }).catch((e)=>{

      })
    },
    resetForm(){
      this.result_id = null
      this.edit = false
      this.modalTitle = ''
      this.result.student_id = null
      this.result.gpa = null
      this.result.published = null
      this.$store.commit('clearErrors');
    }
  },
  created(){
    this.loadStudents()
    this.loadDepartments()
  }
}
</script>

<style scoped>

</style>
