<template>
  <div data-component-name="ListingAddress">
    <h1 v-if="address.full">{{ address.full | capitalize }}</h1>

    <h2 v-if="isAllKeysExist(address, ['city', 'state', 'postalCode'])">
      {{ address.city | capitalize }},
      {{ address.state }}
      {{ address.postalCode }}
    </h2>
  </div>
</template>

<script>
import { isAllKeysExist } from '@/helpers';

export default {
  name: 'ListingAddress',
  props: {
    address: {
      type: Object,
      default: () => ({}),
      validator: value => isAllKeysExist(value, [
        'full',
        'city',
        'state',
        'postalCode',
      ]),
    },
  },
  filters: {
    capitalize(str = '') {
      return str
        .split(' ')
        .map(
          word => (word.charAt(0).toUpperCase())
            .concat(word.slice(1).toLowerCase())
        )
        .join(' ');
    },
  },
  methods: {
    isAllKeysExist,
  },
};
</script>

<style scoped lang="scss">
[data-component-name="ListingAddress"] {
  color: #000000;
  line-height: 120%;

  h1 {
    font-weight: bold;
    font-size: 28px;
    padding-bottom: 10px;
  }

  h2 {
    font-weight: normal;
    font-size: 20px;
    padding-bottom: 14px;
  }
}
</style>
