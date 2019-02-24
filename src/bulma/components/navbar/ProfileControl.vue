<template>
    <core-profile-control>
        <template v-slot:default="{ user, isTouch, visitProfile }">
            <a class="navbar-item user-profile"
                @click="visitProfile()">
                <img class="is-rounded"
                    :src="$store.getters.avatarLink">
                <span v-if="!isTouch"
                    class="has-margin-left-small">
                    {{ $store.state.user.person.appellative || $store.state.user.person.name }}
                </span>
            </a>
        </template>
    </core-profile-control>
</template>

<script>
import CoreProfileControl from '../../../core/components/navbar/ProfileControl.vue';

export default {
    components: { CoreProfileControl },
};
</script>

<style lang="scss">
    img.is-rounded {
        border-radius: 290486px;
    }
</style>
