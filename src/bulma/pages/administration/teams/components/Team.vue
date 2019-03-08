<template>
    <div class="box info-box is-paddingless raises-on-hover"
        :class="[
            { 'is-danger': team.edit && !team.id },
            { 'is-warning': team.edit && team.id },
            { 'is-info': !team.edit && team.users.length === 0 },
        ]">
        <div class="box-header has-padding-medium has-background-light">
            <div class="level is-mobile">
                <div class="level-left">
                    <div name="left"
                        class="level-item">
                        <label class="label">
                            <input class="input team-name"
                                v-model="team.name"
                                v-if="team.edit"
                                v-focus>
                            <span v-else>
                                {{ team.name }}
                            </span>
                        </label>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item has-text-right">
                        <a class="button is-naked animated fadeIn"
                            v-if="!team.edit"
                            @click="team.edit = true">
                            <span class="icon">
                                <fa icon="pencil-alt" size="sm"/>
                            </span>
                        </a>
                        <span class="animated fadeIn"
                            v-else>
                            <a class="button is-naked is-outlined"
                                @click="$emit('cancel');team.edit = false">
                                <span class="icon">
                                    <fa icon="ban"/>
                                </span>
                            </a>
                            <a class="button is-naked is-success is-outlined"
                                :disabled="!team.name"
                                @click="store();">
                                <span class="icon">
                                    <fa icon="check" size="sm"/>
                                </span>
                            </a>
                            <a class="button is-naked is-danger is-outlined"
                                @click="destroy"
                                v-if="team.id !== null">
                                <span class="icon">
                                    <fa icon="trash"/>
                                </span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-body has-padding-medium">
            <div class="is-flex avatar-list">
                <figure class="image is-32x32 has-margin-right-small has-margin-bottom-small"
                    v-for="user in team.users"
                    :key="user.id"
                    v-tooltip="user.name">
                    <img class="is-rounded"
                        :src="avatar(user.avatar.id)">
                </figure>
                <span v-if="!team.edit && !loading && team.users.length === 0"
                    class="has-text-muted is-italic has-margin-bottom-small">
                    {{ i18n('No users yet') }}
                </span>
            </div>
            <fade>
                <div class="has-margin-bottom-large has-margin-top-large"
                    v-if="team.edit && team.name">
                    <label slot="left"
                        class="label">
                        {{ i18n('Members') }}:
                    </label>
                    <enso-select v-model="team.userIds"
                        multiple
                        source="administration.users.options"
                        label="person.name"/>
                </div>
            </fade>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBan, faPencilAlt, faTrash, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';
import { Fade } from '@enso-ui/transitions';
import { VTooltip } from 'v-tooltip';
import { EnsoSelect } from '@enso-ui/bulma';

library.add([faBan, faPencilAlt, faTrash, faCheck]);

export default {
    name: 'Team',

    inject: ['errorHandler', 'i18n'],

    directives: { tooltip: VTooltip, focus },

    components: { Fade, EnsoSelect },

    props: {
        team: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        loading: false,
    }),

    methods: {
        store() {
            this.loading = true;

            axios.post(route('administration.teams.store'), this.team)
                .then(({ data }) => {
                    this.loading = false;
                    this.$toastr.success(data.message);
                    this.team.users = data.team.users;
                    this.team.id = data.team.id;
                    this.team.edit = false;
                    this.$emit('create', this.team);
                }).catch((error) => {
                    if (error.response.status === 422) {
                        this.$toastr.warning(this.i18n('Choose another name'));
                        return;
                    }
                    this.errorHandler(error);
                });
        },
        destroy() {
            this.loading = true;

            axios.delete(route('administration.teams.destroy', this.team.id))
                .then(({ data }) => {
                    this.loading = false;
                    this.$toastr.success(data.message);
                    this.team.edit = false;
                    this.$emit('destroy');
                }).catch(this.errorHandler);
        },
        avatar(id) {
            return route('core.avatars.show', id);
        },
    },
};
</script>

<style lang="scss">
    .team-name {
        width: 200px;

        border-top: unset;
        border-left: unset;
        border-right: unset;
        box-shadow: unset;
        border-radius: 0;

        &:focus {
            box-shadow: unset;
        }
    }

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
