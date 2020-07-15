<template>
  <div>Home
  <div>
    Board list:
    <div v-if="loading">loading ...</div>
    <div v-else>
      <div v-for="b in boards" :key="b.id">
        {{b}}
      </div>
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
  import {board} from '../api'
  export default {
    methods: {
      fetchData() {
        this.loading = true
        board.fetch().then(data => {
          this.boards = data
        }).finally(_ => {
        this.loading = false
        })
      }
    },
    data() {
      return {
        loading: false,
        boards: [],
      }
    },
    created() {
      this.fetchData()
    }

  }

</script>
<style></style>
