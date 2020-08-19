<template>
  <div class="board-menu">
    <div class="board-menu-wrapper">
      <div class="board-menu-header">
        <div><a class="header-back-btn" href="" @click.prevent="onClickBackBtn()" v-if="isShowBoardMenuBackBtn">&leftarrow;</a></div>
        <div class="header-title">{{currentBoardMenu.name}}</div>
        <div><a class="header-close-btn" href="" @click.prevent="onClose">&times;</a></div>
      </div>
      <div class="board-menu-container">
        <div class="board-menu-container-content">
          <ul class="menu-list" v-if="currentBoardMenu.name === menuItems.setting.name">
            <li><a href="" @click.prevent="onClickItem(menuItems.about)">About this board</a></li>
            <li><a href="" @click.prevent="onClickItem(menuItems.background)">Change Background</a></li>
            <li><a href="" @click.prevent="onClickItem(menuItems.more)">more ...</a></li>
          </ul>
          <div v-if="currentBoardMenu.name === menuItems.about.name">
            <div class="about-this-board-section">
              <h3>Made by</h3>
            </div>
            <div class="made-by">
              User name
            </div>
            <div class="about-this-board-section about-this-board-desc">
              <h3>Description</h3>
              <div>
                <textarea :value="board.desc" :readonly="isEditDesc" @click.prevent="updateDesc"/>
                <button class="desc-save-btn">Save</button>
              </div>
            </div>

          </div>
          <div v-if="currentBoardMenu.name === menuItems.background.name">
            <div>
              <ul class="menu-list">
                <li><a href="" @click.prevent="onClickItem(menuItems.color)">Colours</a></li>
                <li><a href="" @click.prevent="onClickItem(menuItems.photo)">Photos</a></li>
              </ul>
            </div>
          </div>
          <div class="background-color-content" v-if="currentBoardMenu.name === menuItems.color.name">
            <div class="color-picker">
              <a href="" data-value="red" @click.prevent="onChangeTheme"></a>
              <a href="" data-value="orange" @click.prevent="onChangeTheme"></a>
              <a href="" data-value="green" @click.prevent="onChangeTheme"></a>
              <a href="" data-value="yellowgreen" @click.prevent="onChangeTheme"></a>
              <a href="" data-value="pink" @click.prevent="onChangeTheme"></a>
              <a href="" data-value="black" @click.prevent="onChangeTheme"></a>
              <a href="" data-value="white" @click.prevent="onChangeTheme"></a>
            </div>
          </div>
          <div class="background-photo-content" v-if="currentBoardMenu.name === menuItems.photo.value">
            unsplash API
          </div>
          <div v-if="currentBoardMenu.name === menuItems.more.name">
            <ul class="menu-list">
              <li><a href="" @click.prevent="onDeleteBoard">Delete board</a></li>
            </ul>
            <hr>
            <form action="">
              <label for="board-url">Link to this board</label>
              <input type="text" readonly="readonly" id="board-url" :value="getBoardUrl">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapMutations, mapActions, mapState} from 'vuex'
  export default {
    data() {
      return {
        menuItems: {
          about : {name:'About'},
          background: {name: 'Change Background'},
          more: {name: '& more'},
          setting: {name: 'Setting'},
          color: {name: 'Colors'},
          photo: {name:'Photos'},
        },
        isEditDesc: false
      }
    },
    computed: {
      ...mapState({
        board: 'board',
        isShowBoardMenuBackBtn: 'isShowBoardMenuBackBtn',
        currentBoardMenu: 'currentBoardMenu',
      }),
      getBoardUrl() {
        return 'localhost:8080' + this.$route.fullPath
      }
    },
    methods: {
      ...mapMutations([
        'SET_IS_SHOW_BOARD_SETTINGS',
        'SET_THEME',
        'SET_CURRENT_BOARD_MENU',
        'SET_IS_SHOW_BOARD_MENU_BACK_BTN'
      ]),
      ...mapActions(['DELETE_BOARD', 'UPDATE_BOARD']),

      onClose() {
        this.SET_IS_SHOW_BOARD_SETTINGS(false)
        this.SET_IS_SHOW_BOARD_MENU_BACK_BTN(false)
        this.SET_CURRENT_BOARD_MENU(this.menuItems.setting)
      },
      onClickItem(type) {

        this.SET_CURRENT_BOARD_MENU(type)

        this.$nextTick(() => {
          if (type === this.menuItems.color) {
            Array.from(this.$el.querySelectorAll('.color-picker a')).forEach((i) => {
              i.style.backgroundColor = i.dataset.value
            })
          }
        })

        this.SET_IS_SHOW_BOARD_MENU_BACK_BTN(true)
      },

      onDeleteBoard() {
        if (!window.confirm(`Delete ${this.board.title} board?`)) return
        this.DELETE_BOARD({id: this.board.id})
          .then(() => { this.SET_IS_SHOW_BOARD_SETTINGS(false)})
          .then(() => { this.$router.push('/')})

      },
      onClickBackBtn() {
        this.SET_CURRENT_BOARD_MENU(this.currentBoardMenu.back? this.currentBoardMenu.back: this.menuItems.setting)
        this.SET_IS_SHOW_BOARD_MENU_BACK_BTN(this.currentBoardMenu.name !== this.menuItems.setting.name)
      },

      onChangeTheme(el) {
        const id = this.board.id
        const bgColor = el.target.dataset.value
        this.UPDATE_BOARD({id, bgColor})
          .then(() => {
            this.SET_THEME(bgColor)
          })
      },
      updateDesc() {

      }
    },
    mounted() {
      this.board.desc = 'this is desc'
      this.menuItems.color.back = this.menuItems.background
      this.menuItems.photo.back = this.menuItems.background
    }
  }
</script>

<style>
  .board-menu {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background-color: #edeff0;
    width: 300px;
    transition: all .3s;
  }

  .board-menu-wrapper {
    padding: 10px;
  }
  .board-menu-header {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    height: 46px;
    /*padding: 0 6px 0 12px;*/
    /*border-bottom: #bbb solid 1px;*/
  }
  .header-title {
    font-size: 18px;
    text-align: center;
    line-height: 46px;
    font-weight:700;
  }
  .header-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    font-size: 24px;
    color: #999;
  }
  .header-back-btn {
    text-decoration: none;
    top: 10px;
    left: 10px;
    position: absolute;
    font-size: 24px;
    color: #999;
  }
  .menu-list {
    list-style: none;
    padding-left: 0;

    /*box-sizing: border-box;*/
    /*display: flex;*/
    /*flex: 1 1 auto;*/
    /*overflow-x: hidden;*/
    /*overflow-y: auto;*/
    /*padding: 12px 6px 12px 12px;*/
    /*width: 100%;*/
    /*height: 100%;*/
  }

  .menu-list li {
    height: 18px;
    line-height: 18px;
    padding: 10px;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 700;
    color: #111;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .menu-list li:hover,
  .menu-list li:focus {
    background-color: rgba(0,0,0, .1);
  }
  .menu-list li a {
    text-decoration: none;
    color: inherit;
  }
  .color-picker {
    margin: 0 15px;
  }
  .color-picker a {
    display: inline-block;
    width: 49%;
    height: 100px;
    border-radius: 8px;
  }

  #board-url {
    padding : 8px 12px;
  }

  .desc-save-btn {
    display: block;
    position: relative;
    top : 0;
    left: 0;
  }
</style>
