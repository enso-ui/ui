<template>
    <core-tasks>
        <template v-slot:default="{
                tasks, loading, pending, overdue,
                fetch, dateTime, flagClass, events,
            }">
            <navbar-item icon="tasks"
                :loading="loading"
                @click="$refs.navbarItem.toggle(); fetch()"
                @touch="$router.push({'name': 'tasks.index'})"
                ref="navbarItem">
                <template v-slot:sup="{ icon }"
                    v-if="overdue > 0">
                    <span class="has-text-danger">
                        {{ overdue }}
                    </span>
                </template>
                <template v-slot:sub
                    v-if="pending > 0">
                    <span class="has-text-info">
                        {{ pending }}
                    </span>
                </template>
                <template v-slot:default>
                    <div class="task-list"
                        v-on="events">
                        <a v-for="task in tasks"
                            :key="task.id"
                            class="navbar-item"
                            @click="$router.push({
                                'name': 'tasks.edit',
                                params: { task: task.id }
                            }); $refs.navbarItem.hide()">
                            <p class="is-task">
                                <span class="icon"
                                    :class="task.flag ? flagClass(task.flag) : null">
                                    <fa icon="flag"
                                        v-if="task.flag"/>
                                </span>
                                <span class="icon"
                                    :class="{'has-text-danger': task.overdue}"
                                    v-tooltip="task.reminder ? dateTime(task.reminder) : null">
                                    <fa icon="clock"
                                        v-if="task.reminder"/>
                                </span>
                                <span>
                                    {{ task.name }}
                                </span>
                                <span class="icon is-small has-text-info is-clickable"
                                    v-tooltip="task.description">
                                    <fa icon="info-circle"
                                        size="xs"/>
                                </span>
                            </p>
                        </a>
                    </div>
                    <hr v-if="tasks.length > 0"
                        class="navbar-divider">
                    <nav v-if="tasks.length > 0"
                        class="level navbar-item">
                        <div class="level-item">
                            <a class="button is-fullwidth is-small is-info"
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

<style lang="scss">
.navbar-item {
    .task-list {
        width: 300px;
        overflow-x: hidden;
        max-height: 400px;
        overflow-y: auto;
    }

    .is-task {
        width: 268px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
