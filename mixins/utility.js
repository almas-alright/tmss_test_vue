import _ from "lodash";
export default {
  data(){
    return {
      departments:[],
      batches:[],
      u_students:[],
      gpa_options:[
        { value: null, text: 'select gpa' },
      ],
    }
  },
 methods:{
   hasError(error, key) {
     if (Object.keys(error).includes(key)) {
       return false
     } else {
       return null
     }
   },
   loadBatches(){
     let that = this
     this.$axios.get('/batches').then(response => {
       let data = response.data.data
       let result = data.map(({ name:text , id:id }) => ( {text, id}));
       that.batches = result
     }).finally(function(){

     })
   },
   loadDepartments(){
     let that = this
     this.$axios.get('/departments').then(response => {
       let data = response.data.data
       let result = data.map(({ name:text , id:id }) => ( {text, id}));
       that.departments = result
     }).finally(function(){

     })
   },
   loadStudents(){
     let that = this
     this.$axios.get('/student-list').then(response => {
       let data = response.data.data
       let result = data.map(({ name:text , id:id }) => ( {text, id}));
       that.u_students = result
     }).finally(function(){

     })
   },
   loadGpa(){
     let that = this
     this.$axios.get('/gpa-list').then(response => {
       let data = response.data.data
       data.forEach(function(item){
         that.gpa_options.push({ value: item.gpa, text: item.gpa })
       })
     }).finally(function(){

     })
   }
 },
  filters:{
    dateFormat: function (value) {
      if (!value) {
        return ''
      } else {
        let parts = value.split('-')
        return parts[2]+'-'+parts[1]+'-'+parts[0]
      }
    }
  }
}
