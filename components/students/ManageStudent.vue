<template>
  <div>
    <b-modal id="students-modal" onclose="resetForm()" no-close-on-backdrop hide-backdrop content-class="shadow" :title="modalTitle">

      <div role="group">
        <label for="input-live">Name:</label>
        <b-form-input
          id="input-live"
          v-model="student.name"
          :state="hasError(lv_errors, 'name')"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Enter Student name"
          trim
        ></b-form-input>
        <div class="invalid-feedback" v-if="lv_errors.name">{{ lv_errors.name[0] }}</div>

      </div>
      <div role="group">
        <label>Department:</label>
          <Select2 v-model="student.department_id" :options="departments" :settings="{ multiple:false, maximumSelectionLength:3 }" placeholder="select department"/>
      </div>
      <div class="text-danger" v-if="lv_errors.department_id">{{ lv_errors.department_id[0] }}</div>
      <div role="group">
        <label>Batch:</label>
        <Select2 v-model="student.batch_id" :options="batches" :settings="{ multiple:false, maximumSelectionLength:3 }" placeholder="select batch"/>
      </div>
      <div class="text-danger" v-if="lv_errors.batch_id">{{ lv_errors.batch_id[0] }}</div>
      <template v-slot:modal-footer>
        <b-button class="mt-3" @click="$bvModal.hide('students-modal')" size="sm">cancel</b-button>
        <b-button v-if="edit" class="mt-3" @click="updateStudent(student_id)" size="sm" variant="info">update</b-button>
        <b-button v-if="!edit" class="mt-3" @click="storeStudent()" size="sm" variant="success">save</b-button>
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
      student_id:null,
      student:{ name:null, department_id:null, batch_id:null },
      edit:false,
      modalTitle: '',
    }

  },
  mixins:[utility],
  methods:{
    getStudent(id){
      let that = this;
      this.$axios.get('/students/'+id).then((response) =>{
        let data = response.data.data
        that.student.name = data.name
        that.student.department_id = data.department_id
        that.student.batch_id = data.batch_id
      })
    },
    deleteStudent(id){
      let that = this;
      this.$axios.delete('/students/'+id).then((response) =>{
        if(response.data.success){
          that.$emit('managed')
        }
      })
    },
    createStudent(){
      this.edit = false
      this.modalTitle = 'Create Student'
      this.$bvModal.show('students-modal')
    },
    storeStudent(){
      let that = this;
      this.$axios.post('/students', that.student).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('students-modal')
          that.$emit('managed')
        }
      }).catch((e)=>{

      })
    },
    editStudent(id){
      this.getStudent(id)
      this.student_id = id
      this.edit = true
      this.modalTitle = 'Edit Student'
      this.$bvModal.show('students-modal')
    },
    updateStudent(id){
      let that = this;
      this.$axios.patch('/students/'+id, that.student).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('students-modal')
          that.$emit('managed')
        }
      }).catch((e)=>{

      })
    },
    resetForm(){
      this.student_id = null
      this.edit = false
      this.modalTitle = ''
      this.student.name = null
      this.$store.commit('clearErrors');
    }
  },
  created(){
    this.loadBatches()
    this.loadDepartments()
    this.loadGpa()
  }
}
</script>

<style scoped>

</style>
