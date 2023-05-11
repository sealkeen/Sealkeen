
import { createErrorMessage } from './fetch-errors.js';

export function create500ErrorMessageIf500(status)
{
    if (status === 500) {
        createErrorMessage('Internal server error occured.');
    }
}