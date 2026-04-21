import { describe, expect, it } from 'vitest';
import serializeParams from '../src/modules/paramsSerializer';

describe('paramsSerializer', () => {
    it('preserves object grouping for arrays of objects', () => {
        const query = serializeParams({
            columns: [
                { name: 'id', meta: { visible: true } },
                { name: 'code', meta: { visible: false } },
            ],
        });

        expect(query).toBe(
            'columns[0][name]=id'
            + '&columns[0][meta][visible]=1'
            + '&columns[1][name]=code'
            + '&columns[1][meta][visible]=0',
        );
    });

    it('preserves scalar arrays', () => {
        const query = serializeParams({
            filters: ['active', 'archived'],
        });

        expect(query).toBe('filters[0]=active&filters[1]=archived');
    });
});
