<template>
<div>
  <b-button class="mt-3" @click="createBatch()" size="sm" variant="secondary">Add</b-button>
  <b-table striped hover :items="batches" :fields="fields">
    <template v-slot:cell(id)="items">
      <b-button squared size="sm" variant="outline-danger" @click="deleteBatch(items.value)">delete</b-button>
      <b-button squared size="sm" variant="outline-info" @click="editBatch(items.value)">edit</b-button>
    </template>
  </b-table>

  <b-modal id="batches-modal" onclose="resetForm()" no-close-on-backdrop hide-backdrop content-class="shadow" :title="modalTitle">
    <div role="group">
      <label for="input-live">Name:</label>
      <b-form-input
        id="input-live"
        v-model="batch.name"
        :state="hasError(lv_errors, 'name')"
        aria-describedby="input-live-help input-live-feedback"
        placeholder="Enter your name"
        trim
      ></b-form-input>
      <div class="invalid-feedback" v-if="lv_errors.name">{{ lv_errors.name[0] }}</div>
    </div>
    <template v-slot:modal-footer>
      <b-button class="mt-3" @click="$bvModal.hide('batches-modal')" size="sm">cancel</b-button>
      <b-button v-if="edit" class="mt-3" @click="updateBatch(batch.id)" size="sm" variant="info">update</b-button>
      <b-button v-if="!edit" class="mt-3" @click="storeBatch()" size="sm" variant="success">save</b-button>
    </template>
  </b-modal>
</div>
</template>

<script>
import _ from 'lodash'
import utility from "~/mixins/utility";
export default {
  name: "All",
  data(){
    return {
      batch:{ name:null, id:null},
      batches:[],
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
    getBatchs(){
      let that = this;
      this.$axios.get('/batches').then((response) =>{
        that.batches = response.data.data
      })
    },
    deleteBatch(id){
      let that = this;
      this.$axios.delete('/batches/'+id).then((response) =>{
        if(response.data.success){
          this.getBatchs();
        }
      })
    },
    createBatch(){
      this.edit = false
      this.modalTitle = 'Create Batch'
      this.$bvModal.show('batches-modal')
    },
    storeBatch(){
      let that = this;
      this.$axios.post('/batches', { name : that.batch.name }).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('batches-modal')
          that.getBatchs();
        }
      }).catch((e)=>{

      })
    },
    editBatch(id){
      this.edit = true
      this.modalTitle = 'Edit Batch'
      let index_of = _.findIndex(this.batches, function(o) { return o.id === id });
      let _batch = this.batches[index_of];
      this.batch = { name: _batch.name, id:_batch.id }
      this.$bvModal.show('batches-modal')
      console.log(this.batch.name)
    },
    updateBatch(id){
      let that = this;
      this.$axios.patch('/batches/'+id, { name : that.batch.name }).then((response) =>{
        if(response.data.success){
          that.$bvModal.hide('batches-modal')
          that.getBatchs();
        }
      }).catch((e)=>{

      })
    },
    resetForm(){
      this.edit = false
      this.modalTitle = ''
      this.batch.name = null
      this.$store.dispatch('validation/clearErrors');
    }
  },
  created(){
    this.getBatchs();
  }
}
</script>

<style scoped>

</style>
