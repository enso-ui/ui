import { describe, expect, it } from 'vitest';
import routeImporter from '../../../../src/modules/importers/routeImporter';

describe('routeImporter', () => {
    it('flattens mixed route modules from glob imports', () => {
        const routes = routeImporter.fromGlob({
            './system.js': {
                default: [{ path: '/dashboard' }, { path: '/projects' }],
            },
            './auth.js': {
                default: { path: '/login' },
            },
        });

        expect(routes).toEqual([
            { path: '/dashboard' },
            { path: '/projects' },
            { path: '/login' },
        ]);
    });

    it('keeps route order from the provided context keys', () => {
        const routes = routeImporter.fromGlob({
            './a.js': { default: { path: '/a' } },
            './b.js': { default: [{ path: '/b' }, { path: '/c' }] },
        });

        expect(routes.map(({ path }) => path)).toEqual(['/a', '/b', '/c']);
    });
});
