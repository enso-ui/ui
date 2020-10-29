<template>
    <core-tasks>
        <template v-slot:default="{
            tasks, loading, isTouch, visible , pending, overdue,
            toggle, hide, dateTime, flagClass, tasksEvents,
        }">
            <a class="navbar-item"
                @click="$router.push({'name': 'tasks.index'})"
                v-if="isTouch">
                <span class="icon">
                    <fa icon="tasks"/>
                </span>
                <sup class="has-text-danger task-count">
                    {{ pending || null }}
                </sup>
            </a>
            <div v-click-outside="hide"
                :class="[
                    'navbar-item',
                    { 'has-dropdown': !isTouch },
                    { 'is-active': visible }
                ]" v-else>
                <a class="navbar-link is-arrowless"
                    @click="toggle()">
                    <span class="icon"
                        :class="{
                            'has-text-muted': pending === 0,
                            'has-text-warning': overdue > 0
                        }">
                        <fa icon="tasks"/>
                    </span>
                    <sup class="has-text-danger task-count">
                        {{ pending || null }}
                    </sup>
                    <loader size="small"
                        v-if="loading"/>
                </a>
                <div v-if="visible"
                    class="navbar-dropdown is-right">
                    <div class="task-list"
                        v-on="tasksEvents">
                        <a v-for="task in tasks"
                            :key="task.id"
                            class="navbar-item"
                            @click="$router.push({
                                'name': 'tasks.edit',
                                params: { task: task.id }
                            }); hide()">
                            <div class="navbar-content">
                                <p class="is-task">
                                    <span class="has-margin-right-medium"
                                        :class="flagClass(task.flag)"
                                        v-if="task.flag">
                                        <fa icon="flag"/>
                                    </span>
                                    <span class="has-margin-right-medium"
                                        :class="{'tag is-warning': task.overdue}"
                                        v-tooltip="dateTime(task.reminder)"
                                        v-if="task.reminder">
                                        <fa icon="clock"/>
                                    </span>
                                    <span v-tooltip="`${task.name}<br>${task.description}`">
                                        {{ task.name }}
                                    </span>
                                </p>
                            </div>
                        </a>
                    </div>
                    <hr v-if="tasks.length"
                        class="navbar-divider">
                    <nav v-if="tasks.length"
                        class="level navbar-item">
                        <div class="level-item">
                            <a class="button is-fullwidth is-info"
                                @click="$router.push({'name': 'tasks.index'}); hide();">
                                <span>{{ i18n("See all") }}</span>
                                <span class="icon is-small">
                                    <fa icon="eye"/>
                                </span>
                            </a>
                        </div>
                    </nav>
                    <a v-else class="navbar-item">
                        <span v-if="loading">
                            {{ i18n("Loading...") }}
                        </span>
                        <span v-else-if="pending === 0">
                            {{ i18n("You don't have any pending tasks") }}
                        </span>
                    </a>
                </div>
            </div>
        </template>
    </core-tasks>
</template>
<script>
import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEye, faClock, faFlag, faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import Loader from '@enso-ui/loader/bulma';
import CoreTasks from '../../../core/components/navbar/Tasks.vue';

library.add(
    faEye, faTasks, faClock, faFlag,
);

export default {
    name: 'Tasks',

    directives: { clickOutside, tooltip: VTooltip },

    components: { CoreTasks, Loader },

    inject: ['i18n'],
};

</script>
<style lang="scss" scoped>
sup.task-count {
    font-size: 0.75em;
    margin-top: -10px;
}

div.task-list {
    width: 300px;
    overflow-x: hidden;
    max-height: 400px;
    overflow-y: auto;
}

p.is-task {
    width: 268px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
