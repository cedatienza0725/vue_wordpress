<template>
  <a
    class="AppContactItem"
    :class="[`AppContactItem--${type}`, `AppContactItem--${color}`]"
    :href="item.url"
    :aria-label="item.title"
  >
    <font-awesome-icon class="AppContactItem__icon" fas :icon="icon" />

    {{ item.title }}
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },

    type: {
      type: String,
      default: "common",
    },

    color: {
      type: String,
      default: "light",
    },
  },

  computed: {
    icon() {
      const icon = this.item.naviconname.split("-");
      icon.shift();

      return icon[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.AppContactItem {
  margin: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.75;
  }

  &__icon {
    margin-right: 10px;
  }

  &--common {
    font-size: 12px;
    font-weight: 600;
    line-height: 175%;

    &:not(:last-of-type) {
      margin-right: 24px;
    }
  }

  &--large {
    font-weight: normal;
    font-size: 20px;
    line-height: 120%;

    &:not(:last-of-type) {
      margin-right: 48px;
    }
  }

  &--dark {
    color: $darkest-pink;

    &__icon {
      fill: $darkest-pink;
    }

    &:focus {
      @include focus-dark;
    }
  }

  &--light {
    &:focus {
      @include focus-light;
    }
  }
}

.AppHeader__static {
  .AppContactItem__icon {
    width: 12px;
    height: 12px;
    color: #f3f3f3;
  }
  .AppContactItem--light {
    color: #f3f3f3;

    &__link {
      fill: $white;
    }

    &:focus {
      @include focus-light;
    }
  }
}

.AppHeader__fixed {
  .AppContactItem__icon {
    width: 12px;
    height: 12px;
    color: #dc008b;
  }
  .AppContactItem--light {
    color: $darkest-pink;

    &__link {
      fill: $darkest-pink;
    }
  }
}

.AppHeader__dark {
  .AppContactItem__icon {
    width: 12px;
    height: 12px;
    color: #dc008b;
  }
}

.AppFooter {
  .AppContactItem__icon {
    width: 20px;
    height: 20px;
  }
  .AppContactItem--light {
    color: #f3f3f3;

    &:focus {
      @include focus-light;
    }
  }
}
</style>
