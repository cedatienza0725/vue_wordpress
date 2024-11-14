<template>
  <li class="AppMainMenu__item">
    <NuxtLink :to="item.url" class="AppMainMenu__link" :aria-label="item.title">
      <font-awesome-icon
        v-if="item.post_name === 'find-a-home'"
        class="icon_find_home"
        :icon="['fas', 'search']"
      />
      {{ item.title }}
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common/variables.scss";

.AppMainMenu {
  &__item {
    padding: 0 18px;
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }
}

.AppMainMenu--horizontal {
  .AppMainMenu__item:first-of-type {
    padding-left: 0;
  }

  .AppMainMenu__item:last-of-type {
    padding-right: 0;
  }
}

.AppHeader__static {
  .AppMainMenu--light {
    .AppMainMenu__link {
      text-transform: lowercase;
      text-decoration: none;
      color: $white;
      display: flex;
      flex-direction: row;
      align-items: center;

      .icon_find_home {
        color: $white;
        height: 18px;
        padding-right: 6px;
      }

      &:focus {
        @include focus-light;
      }
    }
  }
}

.AppHeader__fixed {
  .AppMainMenu--light {
    .AppMainMenu__link {
      text-transform: lowercase;
      text-decoration: none;
      color: $color-primary;
      .icon_find_home {
        color: $color-primary;
        height: 18px;
        padding-right: 6px;
      }

      &:focus {
        @include focus-primary;
      }
    }
  }
}

.AppMainMenu--vertical {
  .AppMainMenu__item:not(:last-of-type) {
    margin-bottom: 14px;
  }
}

.AppMainMenu--dark {
  .AppMainMenu__link {
    text-transform: lowercase;
    text-decoration: none;
    color: $color-primary;
    .icon_find_home {
      color: $color-primary;
      height: 18px;
      padding-right: 6px;
    }

    &:focus {
      @include focus-primary;
    }
  }
}
</style>
