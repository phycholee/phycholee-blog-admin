<template>
  <blog-list></blog-list>
</template>

<script>
  import BlogList from './BlogList.vue'

  export default{
    name: 'Published',
    components:{
      BlogList
    },
    created(){
      this.$store.dispatch('setStatus', 1)
    }
  }
</script>
