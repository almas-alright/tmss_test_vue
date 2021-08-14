import Vue from 'vue';

import { mapGetters } from 'vuex';

const mediaImages = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          mediaImages : 'images/medias'
        })
      }
    })
  }
}

Vue.use(mediaImages);
