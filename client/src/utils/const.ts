import _ from 'lodash';
import texts from './texts.json';

export function getText<T = any>(path: string, defaultValue: T): T {
    return _.get(texts, path, defaultValue);
}
