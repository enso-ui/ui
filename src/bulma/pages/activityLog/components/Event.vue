<template>
    <article class="media">
        <figure class="media-left has-margin-top-small">
            <p class="image is-32x32">
                <img class="is-rounded"
                    :src="route('core.avatars.show', $event.author.avatarId)">
            </p>
        </figure>
        <div class="event">
            <p class="heading">
{{ event.time }}
            </p>
            <message :event="event"
                @show-profile="$router.push({
                    name: 'administration.users.show',
                    params: { user: $event.author.id },
                })"/>
        </div>
    </article>
</template>

<script>
import Message from './Message.vue';

export default {
    name: 'Event',

    components: { Message },

    inject: ['route'],

    props: {
        event: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
    .media > .event > .author {
        font-weight: 600;
    }
</style>
