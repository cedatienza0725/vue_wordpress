<template>
  <swiper-slide>
    <div class="HomePromoSliderItem">
      <div class="HomePromoSliderItem__bg--top" />
      <div class="HomePromoSliderItem__bg--bottom" />

      <template v-if="item.slide_type === 'video' && getSocialVideoService(item.video_source_mp4)">
        <AppVideoPlayer
          :url="item.video_source_mp4"
        />
      </template>

      <img
        v-if="(item.slide_type === 'photo' || !getSocialVideoService(item.video_source_mp4)) && item.banner_img_url"
        class="img--bg"
        :src="item.banner_img_url"
        alt=""
      >
    </div>
  </swiper-slide>
</template>

<script>
import getVideoId from 'get-video-id'

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  data () {
    return {
      vimeoOptions: {
        autoplay: true,
        loop: true,
        controls: false,
        responsive: true
      },
      youtubeOptions: {
        autoplay: 1,
        loop: 1,
        controls: 0
      }
    }
  },

  mounted () {

  },

  methods: {

    getSocialVideoService (url) {
      const { service } = getVideoId(url)

      let videoService = service?.replace(/\s/g, '')
      if (videoService === 'vimeo' || videoService === 'youtube') {
        videoService = service
      } else {
        videoService = ''
      }

      return videoService
    }
  },
}
</script>

<style lang="scss" scoped>
  .HomePromoSliderItem {
    &__bg--top {
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(180deg, rgba(31, 32, 33, 0.8) 0%, rgba(31, 32, 33, 0) 100%);
      max-height: 150px;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    &__bg--bottom {
      position: absolute;
      left: 0%;
      bottom: 0;
      width: 100%;
      max-height: 115px;
      height: 100%;
      background: linear-gradient(180deg, rgba(31, 32, 33, 0) 0%, rgba(31, 32, 33, 0.8) 100%);
      z-index: 2;
    }
  }
</style>
