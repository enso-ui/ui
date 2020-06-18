<template>
    <auth-form is-login
        action="Login"
        route="login"
        @success="init"/>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
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
        ...mapActions(['setAuthorizationToken']),
        init(data) {
            this.setShowQuote(this.meta.showQuote);
            this.setCsrfToken(data.csrfToken);
            this.setAuthorizationToken(data.token);

            setTimeout(() => {
                this.login();
                this.home(true);
            }, 500);
        },
    },
};
</script>
