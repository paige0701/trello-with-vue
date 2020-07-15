<template>
  <div>Home
  <div>
    Board list:
    <div v-if="loading">loading ...</div>
    <div v-else>
      Api result: {{apiRes}}
    </div>
    <ul>
      <li>
        <router-link to="/b/1">Board1</router-link>
      </li>
      <li>
        <router-link to="/b/2">Board2</router-link>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
  export default {
    methods: {
      fetchData() {
        this.loading = true;
        const req = new XMLHttpRequest()
        req.open('GET', 'http://localhost:3000/health')
        req.send()
        req.addEventListener('load', () => {
          this.loading = false
          this.apiRes = {
            status: req.status,
            statusText: req.statusText,
            response: JSON.parse(req.response)
          }
        })
      }
    },
    data() {
      return {
        loading: false,
        apiRes: ''
      }
    },
    created() {
      this.fetchData()
    }

  }

</script>
<style></style>
