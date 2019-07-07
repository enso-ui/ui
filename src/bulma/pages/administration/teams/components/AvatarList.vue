<template>
    <div class="is-flex avatar-list">
        <figure class="image is-32x32 has-margin-right-small has-margin-bottom-small"
            v-for="user in users"
            :key="user.id"
            v-tooltip="user.name">
            <img class="is-rounded"
                :src="route('core.avatars.show', user.avatar.id)">
        </figure>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';

export default {
    name: 'AvatarList',

    directives: { tooltip: VTooltip },

    props: {
        users: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss">
    .avatar-list {
        margin-left: 1em;
        flex-flow: wrap;

        figure {
            transition: margin 0.2s;
            -webkit-transition: margin 0.2s;
            transition: transform .2s;
            -webkit-transition: transform 0.2s;
            margin-left: -1em;

            &:hover {
                margin-left: -0.5em;
                margin-right: 1em;
                transform: scale(1.3);
                z-index: 2;
            }

            img {
                border: 2px solid #f4f6fb;
                border-radius: 50%;

                &:hover {
                    border: none;
                }
            }
        }
    }
</style>
