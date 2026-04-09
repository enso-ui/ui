import Enum from '@enso-ui/enums';
import { useStore } from '../../core/services/pinia';

const translate = key => {
    const localisation = useStore('localisation');

    return localisation?.ready
        ? localisation.translate(key)
        : key;
};

const bootEnums = (enums, i18n = translate) => {
    const obj = {};

    Object.keys(enums)
        .forEach(enumName => (obj[enumName] = new Enum(enums[enumName], i18n)));

    return obj;
};

export default bootEnums;
