<template>
    <card collapsible
        :collapsed="collapsed"
        v-on="$listeners">
        <card-header class="has-background-light">
            <template v-slot:title>
                {{ title }}
            </template>
            <template v-slot:controls>
                <card-control>
                    <div class="has-margin-top-small">
                        <input type="checkbox"
                            :id="'checkbox-' + _uid"
                            :name="'checkbox-' + _uid"
                            class="is-checkradio is-info"
                            @change="updateBelow">
                        <label class="is-paddingless"
                            :for="'checkbox-' + _uid"/>
                    </div>
                </card-control>
                <card-collapse/>
            </template>
        </card-header>
        <card-content class="has-padding-large">
            <checkbox-manager :class="[
                    'is-rounded has-margin-top-small',
                    { 'raises-on-hover': data[group]._items.length }
                ]"
                v-for="group in groups"
                nested
                collapsed
                :title="group"
                :key="group"
                :data="data[group]"
                :role-permissions="rolePermissions"
                @update="update"
                ref="children"/>
            <content-manager :items="data._items"
                :role-permissions="rolePermissions"
                @checked="check"
                @indeterminate="indeterminate"
                @unchecked="uncheck"
                ref="content"
                v-if="data._items.length"/>
        </card-content>
    </card>
</template>

<script>
import {
    Card, CardHeader, CardContent, CardControl, CardCollapse,
} from '@enso-ui/bulma';
import ContentManager from './ContentManager.vue';

import { Checked } from './statuses';

export default {
    name: 'CheckboxManager',

    components: {
        Card, CardControl, ContentManager, CardHeader, CardContent, CardCollapse,
    },

    props: {
        title: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
        rolePermissions: {
            type: Array,
            required: true,
        },
        nested: {
            type: Boolean,
            default: false,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        checkbox() {
            return this.$el.querySelector('input[type=checkbox]');
        },
        groups() {
            return Object.keys(this.data).filter(key => key !== '_items');
        },
    },

    methods: {
        check() {
            this.checkbox.indeterminate = false;
            this.checkbox.checked = true;
            this.$emit('update');
        },
        indeterminate() {
            this.checkbox.checked = false;
            this.checkbox.indeterminate = true;
            this.$emit('update');
        },
        uncheck() {
            this.checkbox.checked = false;
            this.checkbox.indeterminate = false;
            this.$emit('update');
        },
        update() {
            const checkedCount = this.$refs.children
                .filter(child => child.checkbox.checked
                    && (!child.$refs.content || child.$refs.content.status === Checked))
                .length;

            if (checkedCount === this.$refs.children.length) {
                this.check();
                return;
            }

            const indeterminateCount = this.$refs.children
                .filter(child => child.checkbox.indeterminate).length;

            if (checkedCount || indeterminateCount) {
                this.indeterminate();
                return;
            }

            this.uncheck();
        },
        updateBelow() {
            this.updateContent();
            this.updateChildren();
        },
        updateContent() {
            if (!this.$refs.content) {
                return;
            }

            if (this.checkbox.checked) {
                this.$refs.content.checkAll();
                return;
            }

            this.$refs.content.uncheckAll();
        },
        updateChildren() {
            if (!this.$refs.children) {
                return;
            }

            this.$refs.children.forEach((child) => {
                child.checkbox.checked = this.checkbox.checked;
                child.updateBelow();
            });
        },
    },
};
</script>
