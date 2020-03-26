import RouteMapper from '@enso-ui/route-mapper';
import { coreState } from '../store';

export default (name, params, absolute) => {
    const { meta, routes } = coreState;

    return (new RouteMapper(meta.appUrl, routes).get(name, params, absolute));
};
