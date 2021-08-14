<template>
<div>
  <b-button class="mt-3" @click="createDepartment()" size="sm" variant="secondary">Add</b-button>
  <b-table striped hover :items="departments" :fields="fields">
    <template v-slot:cell(id)="items">
      <b-button squared size="sm" variant="outline-danger" @click="deleteDepartment(items.value)">delete</b-button>
      <b-button squared size="sm" variant="outline-info" @click="editDepartment(items.value)">edit</b-button>
    </template>
  </b-table>

  <b-modal id="departments-modal" onclose="resetForm()" no-close-on-backdrop hide-backdrop content-class="shadow" :title="modalTitle">
    <div role="group">
      <label for="input-live">Name:</label>
      <b-form-input
        id="input-live"
        v-model="department.name"
        :state="hasError(lv_errors, 'name')"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter your name"
        trim
      ></b-form-input>
      <div class="invalid-feedback" v-if="lv_errors.name">{{ lv_errors.name[0] }}</div>
    </div>
    <template v-slot:modal-footer>
      <b-button class="mt-3" @click="$bvModal.hide('departments-modal')" size="sm">cancel</b-button>
      <b-button v-if="edit" class="mt-3" @click="updateDepartment(department.id)" size="sm" variant="info">update</b-button>
      <b-button v-if="!edit" class="mt-3" @click="storeDepartment()" size="sm" variant="success">save</b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import _ from 'lodash'
import utility from "../../mixins/utility";
export default {
  name: "All",
  data(){
    return {
      department:{ name:null, id:null},
      departments:[],
      edit:false,
      modalTitle: '',
      fields:[
        {key:'name', label:'Name'},
        {key:'id', label:'Action'},
      ]
    }

  },
  mixins:[utility],
  methods:{
    getDepartments(){
      let that = this;
      this.$axios.get('/departments').then((response) =>{
        that.departments = response.data.data
      })
    },
    deleteDepartment(id){
      let that = this;
      this.$axios.delete('/departments/'+id).then((response) =>{
        if(response.data.success){
          this.getDepartments();
        }
      })
    },
    createDepartment(){
      this.edit = false
      this.modalTitle = 'Create Department'
      this.$bvModal.show('departments-modal')
    },
    storeDepartment(){
      let that = this;
      this.$axios.post('/departments', { name : that.department.name }).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('departments-modal')
          that.getDepartments();
        }
      }).catch((e)=>{

      })
    },
    editDepartment(id){
      this.edit = true
      this.modalTitle = 'Edit Department'
      let index_of = _.findIndex(this.departments, function(o) { return o.id === id });
      let _department = this.departments[index_of];
      this.department = { name: _department.name, id:_department.id }
      this.$bvModal.show('departments-modal')
      console.log(this.department.name)
    },
    updateDepartment(id){
      let that = this;
      this.$axios.patch('/departments/'+id, { name : that.department.name }).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('departments-modal')
          that.getDepartments();
        }
      }).catch((e)=>{

      })
    },
    resetForm(){
      this.edit = false
      this.modalTitle = ''
      this.department.name = null
      this.$store.commit('validation/SET_VALIDATION_ERRORS', {});
    }
  },
  created(){
    this.getDepartments();
  }
}
</script>

<style scoped>

</style>
