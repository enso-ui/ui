<template>
    <auth-form is-login
        action="Login"
        route="login"
        @success="init"/>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AuthForm from './components/AuthForm.vue';

export default {
    name: 'Login',

    components: { AuthForm },

    computed: {
        ...mapState(['meta']),
    },

    methods: {
        ...mapMutations('auth', ['login']),
        ...mapMutations('layout', ['home']),
        ...mapMutations(['setShowQuote', 'setCsrfToken']),
        init(data) {
            this.setShowQuote(this.meta.showQuote);
            this.setCsrfToken(data.csrfToken);
            setTimeout(() => {
                this.login();

                if (localStorage.getItem('redirectAfterLogin')) {
                    this.$router.push({ path: localStorage.getItem('redirectAfterLogin') });
                    localStorage.removeItem('redirectAfterLogin');
                }

                this.home(true);
            }, 500);
        },
    },
};
</script>
