<template>
  <v-img
    v-bind="$attrs"
    :src="imgPath"
  ></v-img>
</template>
<script>
export default {
  props: ['path'],
  name: 'ImageComponent',
  data() {
    return {
      noImage: '/photo_1280.png'
    }
  },
  computed: {
    imgPath() {
      try {
        const image = this.path ? '/images' + this.path : this.noImage
        return image && require('@/assets' + image);
      } catch (err) {
        return require('@/assets' + this.noImage);
      }
    }
  }
}
</script>