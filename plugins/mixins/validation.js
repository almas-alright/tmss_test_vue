import Vue from 'vue';

import { mapGetters } from 'vuex';

const validation = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    lv_errors : 'validation/errors'
                })
            }
        })
    }
}

Vue.use(validation);
