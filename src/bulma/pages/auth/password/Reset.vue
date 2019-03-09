<template>
    <auth-form is-reset
        action="Set a new password"
        route="password.reset"
        @success="success">
        <template v-slot:password-strength="props">
            <p class="help">
                <password-strength v-bind="props"/>
            </p>
        </template>
    </auth-form>
</template>

<script>
import AuthForm from '../components/AuthForm.vue';
import PasswordStrength from '../components/PasswordStrength.vue';

export default {
    name: 'Reset',

    components: { AuthForm, PasswordStrength },

    methods: {
        success({ status }) {
            this.$toastr.success(status);
            setTimeout(() => this.$router.push({ name: 'login' }), 350);
        },
    },
};
</script>
