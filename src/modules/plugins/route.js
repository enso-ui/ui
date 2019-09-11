import Route from '../Route';

export default (name, params, absolute) => {
    const route = (new Route(name, params, absolute));
    return route.get();
};
