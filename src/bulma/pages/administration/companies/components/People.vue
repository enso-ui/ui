<template>
    <div class="people-wrapper">
        <div class="field is-grouped">
            <slot name="controls"
                :create="create"
                :internal-query="internalQuery"
                :fetch="fetch">
                <p class="control">
                    <a class="button is-rounded is-small is-bold is-info"
                        @click="create()"
                        v-if="canAccess('administration.companies.people.create')">
                        <span>
                            {{ i18n('Assign') }}
                        </span>
                        <span class="icon">
                            <fa icon="plus"/>
                        </span>
                    </a>
                </p>
                <p class="control has-icons-left has-icons-right is-expanded">
                    <input v-model="internalQuery"
                        class="input is-rounded is-small is-expanded"
                        type="text"
                        :placeholder="i18n('Filter')">
                    <span class="icon is-small is-left">
                        <fa icon="search"/>
                    </span>
                    <span v-if="internalQuery"
                        class="icon is-small is-right clear-button"
                        @click="internalQuery = ''">
                        <a class="delete is-small"/>
                    </span>
                </p>
                <p class="control">
                    <a class="button is-rounded is-small is-bold has-margin-left-medium"
                        @click="fetch()">
                        <span>
                            {{ i18n('Reload') }}
                        </span>
                        <span class="icon">
                            <fa icon="sync"/>
                        </span>
                    </a>
                </p>
            </slot>
        </div>
        <div class="columns is-multiline has-margin-top-large">
            <div v-for="(person, index) in filteredPeople"
                 :key="index"
                 class="column is-half-tablet">
                <person :id="id"
                     :person="person"
                     :index="index"
                     @edit="edit(person)"
                     @delete="destroy(person, index)"/>
            </div>
            <person-form :path="path"
                :company-id="id"
                @ready="$refs.form.field('company_id').value = id"
                @close="path = null"
                @destroy="fetch()"
                @edit-person="navigateToPerson"
                @submit="fetch(); path = null"
                ref="form"
                 v-if="path"/>
        </div>
        <modal :show="!!deletedPerson"
            @close="deletedPerson = null">
            <div class="box">
                <h5 class="subtitle is-5">
                    {{ i18n("Do you want to delete the associated person?") }}
                </h5>
                <hr>
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <button class="button is-outlined"
                                @click="deletedPerson = null">
                                {{ i18n('No') }}
                            </button>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <button class="button is-danger has-margin-left-small"
                                @click="destroyPerson">
                                {{ i18n('Yes') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSync, faSearch } from '@fortawesome/free-solid-svg-icons';
import { mapState } from 'vuex';
import { Modal } from '@enso-ui/bulma';
import Person from './Person.vue';
import PersonForm from './PersonForm.vue';

library.add(faPlus, faSync, faSearch);

export default {
    name: 'People',

    inject: ['canAccess', 'errorHandler', 'i18n'],

    components: { Person, PersonForm, Modal },

    props: {
        id: {
            type: Number,
            required: true,
        },
        query: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        loading: false,
        people: [],
        path: null,
        internalQuery: '',
        deletedPerson: null,
    }),

    computed: {
        filteredPeople() {
            const query = this.internalQuery.toLowerCase();

            return query
                ? this.people.filter(({ name, position }) => name.toLowerCase().indexOf(query) > -1
                        || position.toLowerCase().indexOf(query) > -1)
                : this.people;
        },
        count() {
            return this.filteredPeople.length;
        },
    },

    watch: {
        query() {
            this.internalQuery = this.query;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.loading = true;

            axios.get(route(
                'administration.companies.people.index',
                { company: this.id },
            )).then(({ data }) => {
                this.people = data;
                this.$emit('update');
                this.loading = false;
            }).catch(this.errorHandler);
        },
        create() {
            this.path = route(
                'administration.companies.people.create',
                { company: this.id },
            );
        },
        edit(person) {
            this.path = route(
                'administration.companies.people.edit',
                { company: this.id, person: person.id },
            );
        },
        destroy(person, index) {
            this.loading = true;

            axios.delete(route(
                'administration.companies.people.destroy',
                { company: this.id, person: person.id },
            )).then(() => {
                const deletedPerson = this.people.splice(index, 1).pop();
                this.$emit('remove', deletedPerson.id);

                if (this.canAccess('administration.people.destroy')) {
                    this.deletedPerson = deletedPerson;
                }

                this.$emit('update');
                this.loading = false;
            }).catch(this.errorHandler);
        },
        destroyPerson() {
            this.loading = true;

            axios.delete(
                route('administration.people.destroy',
                    { person: this.deletedPerson.id }),
            ).then(({ data }) => {
                this.deletedPerson = null;
                this.$toastr.success(data.message);
                this.loading = false;
            }).catch(this.errorHandler);
        },
        navigateToPerson($event) {
            this.path = null;

            this.$nextTick(() => {
                this.$router.push({
                    name: 'administration.people.edit',
                    params: { person: $event },
                });
            });
        },
    },
};
</script>
