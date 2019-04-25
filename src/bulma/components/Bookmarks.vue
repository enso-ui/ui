<template>
    <core-bookmarks>
        <template v-slot:default="{
                bookmarks, stickies, reorderBindings, reorderEvents,
                remove, stick, clear, isExcluded
            }">
            <div class="bookmarks">
                <span class="control">
                    <a v-if="stickies.length"
                        class="tag is-warning icon has-margin-right-small"
                        @click="clear">
                        <fa icon="trash-alt"/>
                    </a>
                </span>
                <draggable class="field is-grouped bookmark-items no-scrollbars"
                    v-bind="reorderBindings"
                    v-on="reorderEvents">
                    <span v-for="bookmark in bookmarks"
                        :key="bookmark.name"
                        class="control">
                        <span class="tags has-addons">
                            <a :class="['tag is-bold', {'is-link': bookmark.name === $route.name}]"
                                @click="$router.push({
                                    name: bookmark.name,
                                    params: bookmark.params,
                                    query: bookmark.query
                                })">
                                {{ i18n(bookmark.meta.title) }}
                            </a>
                            <a v-if="!bookmark.sticky && !isExcluded(bookmark)"
                                class="tag is-success check"
                                @click="stick(bookmark)">
                                <span class="icon is-small">
                                    <fa icon="check"/>
                                </span>
                            </a>
                            <a v-if="bookmarks.length > 1 && !isExcluded(bookmark)"
                                class="tag is-delete"
                                @click="remove(bookmark)"/>
                        </span>
                    </span>
                </draggable>
            </div>
        </template>
    </core-bookmarks>
</template>

<script>
import Draggable from 'vuedraggable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CoreBookmarks from '../../core/components/Bookmarks.vue';

library.add(faCheck, faTrashAlt);

export default {
    name: 'Bookmarks',

    components: { CoreBookmarks, Draggable },

    inject: ['i18n'],
};
</script>

<style lang="scss">
$directions : 'rtl' , 'ltr';
@each $dir in $directions {
    .bookmarks {
        position: fixed;
        top: 52px;
        width: 100vw;
        display: flex;
        padding: 0.2em;
        -webkit-box-shadow: 0 1px 1px hsla(0,0%,4%,.2);
        box-shadow: 0 1px 1px hsla(0,0%,4%,.2);
        z-index: 2;

        @if $dir == 'rtl' {
            [dir='#{$dir}'] & {
                transition: margin-right .5s, width .5s;
                margin-right: 0;
                margin-left: unset;
            }
        } @else {
            transition: margin-left .5s, width .5s;
            margin-left: 0;
        }

        &.with-menu {
            width: calc(100vw - 180px);

            @if $dir == 'rtl' {
                [dir='#{$dir}'] & {
                    margin-right: 180px;
                    margin-left: unset;
                }
            } @else {
                margin-left: 180px;
            }

            &.menu-collapsed {
                width: calc(100vw - 56px);

                @if $dir == 'rtl' {
                [dir='#{$dir}'] & {
                    margin-right: 56px; 
                    margin-left: unset;
                }
                } @else {
                    margin-left: 56px; 
                }
            }
        }

        a.tag:hover {
            text-decoration: none;
        }

        .tag.check {
            @if $dir == 'rtl' {
                [dir='#{$dir}'] & {
                    margin-right: 0.1em; 
                    margin-left: unset;
                }
                } @else {
                    margin-left: 0.1em;
                }
        }

        .bookmark-items {
            position: relative;
            overflow-x: auto;
            overflow-y: hidden;

            .control:not(:last-child) {
                @if $dir == 'rtl' {
                [dir='#{$dir}'] & {
                    margin-left: .25em;
                    margin-right: unset; 
                }
                } @else {
                    margin-right: .25em;
                }
            }
        }
    }
}
</style>
