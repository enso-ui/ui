<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters is-full-touch">
            <enso-form class="box has-background-light raises-on-hover animated fadeIn"
                @loaded="companyId = $refs.form.routeParam('company')"
                ref="form">
                <template slot="mandatary_id"
                    slot-scope="{ field, errors, i18n }">
                    <select-field :errors="errors"
                        :field="field"
                        :i18n="i18n"
                        :params="{ company_id: companyId }"/>
                </template>
            </enso-form>

            <accessories v-if="companyId">
                <template slot-scope="{ count }">
                    <tab keep-alive
                        id="People">
                        <people :id="companyId"
                            @update="$set(count, 'People', $refs.people.count)"
                            ref="people"/>
                    </tab>
                    <tab keep-alive
                        id="Addresses">
                        <addresses :id="companyId"
                            type="LaravelEnso\Companies\app\Models\Company"
                            @update="$set(count, 'Addresses', $refs.addresses.count)"
                            ref="addresses"/>
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
                            <div class="column is-four-fifths">
                                <discussions :id="companyId"
                                    type="LaravelEnso\Companies\app\Models\Company"
                                    @update="$set(count, 'Discussions', $refs.discussions.count)"
                                    ref="discussions"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                        id="Documents">
                        <documents :id="companyId"
                            type="LaravelEnso\Companies\app\Models\Company"
                            @update="$set(count, 'Documents', $refs.documents.count)"
                            ref="documents"/>
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
import { EnsoForm, SelectField } from '@enso-ui/forms/bulma';
import People from './components/People.vue';

export default {
    name: 'Edit',

    components: {
        EnsoForm,
        SelectField,
        Accessories,
        Tab,
        Addresses,
        Comments,
        Discussions,
        Documents,
        People,
    },

    data: () => ({
        companyId: null,
    }),
};
</script>
