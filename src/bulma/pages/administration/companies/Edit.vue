<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                ref="form">
                <template v-slot:mandatary="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
            </enso-form>
            <accessories>
                <template slot-scope="{ count }">
                    <tab keep-alive
                        id="People">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <people :id="companyId"
                                    @update="$set(count, 'People', $refs.people.count)"
                                    @remove="personRemoved"
                                    ref="people"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        id="Addresses">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <addresses :id="companyId"
                                    type="LaravelEnso\Companies\app\Models\Company"
                                    @update="$set(count, 'Addresses', $refs.addresses.count)"
                                    ref="addresses"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        id="Comments">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <comments :id="companyId"
                                    type="LaravelEnso\Companies\app\Models\Company"
                                    @update="$set(count, 'Comments', $refs.comments.count)"
                                    ref="comments"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        id="Discussions">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <discussions :id="companyId"
                                    type="LaravelEnso\Companies\app\Models\Company"
                                    @update="$set(count, 'Discussions', $refs.discussions.count)"
                                    ref="discussions"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        id="Documents">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <documents :id="companyId"
                                    type="LaravelEnso\Companies\app\Models\Company"
                                    @update="$set(count, 'Documents', $refs.documents.count)"
                                    ref="documents"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>
import { Tab } from '@enso-ui/bulma';
import {
    Accessories, Addresses, Comments, Discussions, Documents,
} from '@enso-ui/accessories/bulma';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import People from './components/People.vue';

export default {
    name: 'Edit',

    components: {
        EnsoForm,
        FormField,
        Accessories,
        Tab,
        Addresses,
        Comments,
        Discussions,
        Documents,
        People,
    },

    computed: {
        companyId() {
            return Number.parseInt(this.$route.params.company, 10);
        },
        pivotParams() {
            return {
                companies: { id: this.companyId },
            };
        },
    },

    methods: {
        personRemoved(personId) {
            if (this.$refs.form.field('mandatary').value === personId) {
                this.$refs.form.field('mandatary').value = null;
            }
        },
    },
};
</script>
