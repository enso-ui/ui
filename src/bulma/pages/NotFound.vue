<template>
    <div class="container">
        <div class="error-container has-text-grey">
            <div class="subtitle is-2">
                {{ __('The requested page does not exist') }}
                <fa class="has-text-warning"
                    icon="exclamation-triangle"/>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle);

export default {
    name: 'NotFound',
};
</script>

<style>
    .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        font-weight: 100;
    }
</style>
