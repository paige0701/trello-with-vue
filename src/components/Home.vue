<template>
  <div>
    <div class="home-title">Personal boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="(board, i) in boards" :key="i"
           :data-bgcolor="board.bgColor" ref="boardItem">
        <router-link :to="`/b/${board.id}`">
          <div class="board-item-title">{{board.title}}</div>
        </router-link>
      </div>
      <div class="board-item">
        <a class="new-board-btn" href="" @click.prevent="SET_IS_ADD_BOARD(true)">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" @close="isAddBoard = false"/>
  </div>
</template>
<script>
  import AddBoard from './AddBoard'
  import {mapActions, mapMutations, mapState} from 'vuex'
  export default {
    components: {AddBoard},
    computed: {
      ... mapState([
        'isAddBoard', 'boards'
      ])
    },
    methods: {
      ...mapMutations(['SET_IS_ADD_BOARD', 'SET_THEME']),
      ...mapActions([
        'FETCH_BOARDS'
      ]),
      fetchData() {
        this.loading = true
        this.FETCH_BOARDS()
          .finally(_ => {
        this.loading = false
        })
      },
      addBoard() {
        this.$store.commit('SET_IS_ADD_BOARD', true)
      }
    },
    data() {
      return {
        loading: false,
      }
    },

    created() {
      this.fetchData()
      this.SET_THEME()
    },
    updated() {
      this.$refs.boardItem.forEach((el) => {
        el.style.backgroundColor = el.dataset.bgcolor
      })
    }

  }

</script>
<style>
  .home-title {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .board-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .board-item {
    width: 23%;
    height: 100px;
    margin: 0 2% 20px 0;
    border-radius: 3px;
  }
  .board-item-new {
    background-color: #ddd;
  }
  .board-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  .board-item a:hover,
  .board-item a:focus {
    background-color: rgba(0,0,0, .1);
    color: #666;
  }
  .board-item-title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 10px;
  }
  .board-item a.new-board-btn {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    height: 100px;
    width: inherit;
    color: #888;
    font-weight: 700;
  }
</style>
