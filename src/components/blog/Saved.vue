<template>
  <blog-list></blog-list>
</template>

<script>
  import BlogList from './BlogList.vue'

  export default{
    name: 'Saved',
    components:{
      BlogList
    },
    created(){
      this.$store.dispatch('setStatus', 2)
    }
  }
</script>
