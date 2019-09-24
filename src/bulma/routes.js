import routeImporter from '../modules/importers/routeImporter';
import RouteMerger from '../modules/importers/RouteMerger';

const routes = routeImporter(require.context('./routes', false, /.*\.js$/));

(new RouteMerger(routes))
    .add(routeImporter(require.context('@enso-ui/companies/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/data-import/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/files/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/how-to/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/localisation/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/menus/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/people/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/permissions/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/roles/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/teams/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/tutorials/src/bulma/routes', false, /.*\.js$/)))
    .add(routeImporter(require.context('@enso-ui/activity-log/src/bulma/routes', false, /.*\.js$/)))
;

export default routes;
