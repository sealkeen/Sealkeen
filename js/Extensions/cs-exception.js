import { createErrorMessage } from "../Errors/fetch-errors.js";

const Exception = {
    Throw: function(message)
    {
        createErrorMessage(`[ERR] ${message}`);
        console.log(`[ERR] ${message}`)
    }
};

export default Exception;