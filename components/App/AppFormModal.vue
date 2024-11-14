<template>
  <div class="AppFormModal">
    <div class="AppFormModal__header">
      <div class="AppFormModal__close" @click.prevent="closeModal()">
        <font-awesome-icon
          class="AppFormModal__icon"
          :icon="['fas', 'times']"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form_data: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    closeModal() {
      this.$modal.hideAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.AppFormModal {
  &__header {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__close {
    height: 40px;
    width: 40px;
    background: #f5f5f5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    height: 15px;
    width: 15px;
  }
}

.vm--container {
  width: 100px !important;
  height: 100px !important;
}
</style>
