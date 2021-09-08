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
        if (this.path) {
          return `http://ec2-3-12-199-144.us-east-2.compute.amazonaws.com:5000/public${this.path}`;
        } else {
          return require('@/assets' + this.noImage);
        }
        // const image = this.path ? '/images' + this.path : this.noImage
        // return image && require('@/assets' + image);
      } catch (err) {
        return require('@/assets' + this.noImage);
      }
    }
  }
}
</script>