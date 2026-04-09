import RouteMapper from '@enso-ui/route-mapper';
import { useStore } from '../../core/services/pinia';

export default (name, params, absolute) => {
    const state = useStore('app');

    return new RouteMapper(state.meta.appUrl, state.routes).get(name, params, absolute);
};
