import { createErrorMessage } from "../Errors/fetch-errors.js";

const Exception = {
    Throw: function(message)
    {
        createErrorMessage(`[ERR] ${message}`);
        console.error(`[ERR] ${message}`)
    }
};

export default Exception;