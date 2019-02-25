import Vue from 'vue';
import Route from '../Route';

window.route = (name, params, absolute) => {
    const route = (new Route(name, params, absolute));
    return route.get();
};

Vue.prototype.route = window.route;
