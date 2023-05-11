
import { createErrorMessage } from './fetch-errors.js';

export function create429ErrorMessageOrThrowError(status)
{
    if (status === 429) {
        createErrorMessage('Request rate is too high');
    } else {
        throw new Error('Fetch error.');
    }
}