<template>
  <div>
    Card
    <div>
      <div v-if="loading">loading...</div>
      <div v-else>
      cid: {{cid}}
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        cid: 0,
        loading: false
      }
    },
    methods: {
      fetchData() {
        this.loading = true
        setTimeout(() => {
          this.cid = this.$route.params.cid
          this.loading = false
        }, 500)
      }
    },
    watch: {
      '$route': {
        handler : 'fetchData',
        immediate: true
      }
    },
    created() {
      this.fetchData();

    }
  }

</script>
<style></style>
