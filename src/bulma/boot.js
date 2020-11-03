const packages = require.context('../../..', true, /src\/bulma\/index\.js$/);

packages.keys().forEach(packages);
