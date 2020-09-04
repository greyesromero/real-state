<template>
  <v-container class="h-100">
    <div class="py-6" style="float:right;">
      <v-btn 
        @click="$emit('close-gallery')"
        icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div 
      :style="{height: $vuetify.breakpoint.smAndUp ? '450px' : '200px'}"
      class="swiper-container gallery">
      <div class="swiper-wrapper">
        <div class="swiper-slide grey lighten-2"
          v-for="image in images"
          :key="image.image"
          :style="{backgroundImage: !image.floorPlan ? `url(${image.image})` : ''}"
        >
          <img 
            :src="image.image" 
            alt="plano" 
            v-if="image.floorPlan" 
            :height="$vuetify.breakpoint.smAndUp ? '450px' : '200px'"
            style="display: block; margin: auto;">
        </div>
      </div>
    </div>
    <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide grey lighten-2"
          v-for="image in images"
          :key="image.image"
          :style="{backgroundImage: !image.floorPlan ? `url(${image.image})` : ''}"
        >
          <div v-if="image.floorPlan" style="height: 100%; border: 2px solid #1976d2; border-radius: inherit;">
            <v-container fill-height pa-0 justify-center>
              <v-icon color="primary">mdi-floor-plan</v-icon>
              <span class="primary--text ml-1">Plano</span>
            </v-container>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </v-container>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'detail-gallery',
  props: ['property'],
  data() {
		return {
			galleryThumbs: null,
			gallery: null,
			image:'../assets/img/house5.jpg',
			items: []
		}
    
  },
  mounted() {
    this.initSwiper()
  },
  computed: {
    images() {
      const images = []

      this.property.images.forEach(area => {
        images.push({
          image: area.image,
          floorPlan: false
        })
      })

      return images
    }
  },
  methods: {
    initSwiper() {
      this.galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 2,
        slidesPerView: 3,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      this.gallery = new Swiper('.gallery', {
        spaceBetween: 10,
        lazy: true,
        loop:true,
        loopedSlides: 6,
        thumbs: {
          swiper: this.galleryThumbs,
        },
      });
    },
  },

}
</script>
