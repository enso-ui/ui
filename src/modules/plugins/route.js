import RouteMapper from '@enso-ui/route-mapper';
import { app } from '../../pinia/app';

export default (name, params, absolute) => {
    const state = app();

    return new RouteMapper(state.meta.appUrl, state.routes).get(name, params, absolute);
};
