
import { createErrorMessage } from './fetch-errors.js';
import { create500ErrorMessageIf500 } from './fetch-errors-5xx.js';

export function create429ErrorMessageOrThrowError(status)
{
    create500ErrorMessageIf500(status);
    if (status === 429) {
        createErrorMessage('Request rate is too high');
    } else {
        throw new Error('Fetch error.');
    }
}