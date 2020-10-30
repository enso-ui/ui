<template>
    <core-tasks>
        <template v-slot:default="{
                tasks, loading, pending, overdue,
                fetch, dateTime, flagClass, tasksEvents,
            }">
            <navbar-item icon="tasks"
                :loading="loading"
                @click="$refs.navbarItem.toggle(); fetch()"
                @touch="$router.push({'name': 'tasks.index'})"
                ref="navbarItem">
                <template v-slot:desktop-icon="{ icon } ">
                    <span class="icon"
                        :class="{
                            'has-text-muted': pending === 0,
                            'has-text-warning': overdue > 0
                        }">
                        <fa :icon="icon"/>
                    </span>
                </template>
                <template v-slot:sup>
                    {{ pending || null }}
                </template>
                <template v-slot:default>
                    <div>
                        <div class="task-list"
                            v-on="tasksEvents">
                            <a v-for="task in tasks"
                                :key="task.id"
                                class="navbar-item"
                                @click="$router.push({
                                    'name': 'tasks.edit',
                                    params: { task: task.id }
                                }); $refs.navbarItem.hide()">
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
                                    @click="$router.push({
                                        'name': 'tasks.index'
                                    }); $refs.navbarItem.hide();">
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
                </template>
            </navbar-item>
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
import CoreTasks from '../../../core/components/navbar/Tasks.vue';
import NavbarItem from './NavbarItem.vue';

library.add(
    faEye, faTasks, faClock, faFlag,
);

export default {
    name: 'Tasks',

    directives: { clickOutside, tooltip: VTooltip },

    components: { CoreTasks, NavbarItem },

    inject: ['i18n'],
};

</script>
<style lang="scss" scoped>
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
