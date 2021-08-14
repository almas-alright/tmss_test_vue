import _ from "lodash";
export default {
  data(){
    return {
      departments:[],
      batches:[],
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
 }
}
