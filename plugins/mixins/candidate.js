import Vue from 'vue';

import { mapGetters } from 'vuex';

const candidateData = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          candidateData : 'candidate/candidateData'
        })
      }
    })
  }
}

Vue.use(candidateData);
