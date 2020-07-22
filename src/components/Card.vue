<template>
  <div>
    <Modal class="modal-card">
      <div slot="header" class="modal-card-header">
        <div class="modal-card-header-title">
          <input @click="toggleTitle=true"
                 @blur="onBlurTitle"
                 type="text"
                 class="form-control"
                 :value="card.title"
                 :readonly="!toggleTitle"
                 ref="inputTitle">
        </div>
        <a href="" class="modal-close-btn" @click.prevent="onClose">&times;</a>
      </div>
      <div slot="body">
        <h3>Description</h3>
        <textarea readonly
                  @click="toggleDescription=true"
                  @blur="onBlurDescription"
                  class="form-control"
                  cols="30" rows="3"
                  placeholder="Add more detailed description"
                  :readonly="!toggleDescription"
                  v-model="card.description"
                  ref="inputDescription"
        ></textarea>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import Modal from './Modal'
  import {mapActions, mapState} from 'vuex'
  export default {
    components: { Modal },
    data() {
      return {
        toggleTitle: false,
        toggleDescription: false
      }
    },
    computed: {
      ...mapState({
        card: 'card',
        board: 'board'
      })
    },
    methods: {
      ...mapActions(['FETCH_CARD', 'UPDATE_CARD']),
      onClose() {
        this.$router.push(`/b/${this.board.id}`)
      },
      onBlurTitle() {
        this.toggleTitle = false
        const title = this.$refs.inputTitle.value.trim()
        if (!title) return
        this.UPDATE_CARD({id: this.card.id, title: title}).then(() => {
          this.fetchCard()
        })
      },
      fetchCard() {
        const id = this.$route.params.cid
        this.FETCH_CARD({id})
      },
      onBlurDescription() {
        this.toggleDescription = false
        const description = this.$refs.inputDescription.value.trim()
        if (!description) return
        this.UPDATE_CARD({id: this.card.id, description: description}).then(() => {
          this.fetchCard()
        })
      }
    },
    created() {
      this.fetchCard()
    }
  }

</script>
<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>
