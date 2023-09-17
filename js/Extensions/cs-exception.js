import { createErrorMessage } from "../Errors/fetch-errors.js";

const Exception = {
    Throw: function(message)
    {
        createErrorMessage(`[ERR] ${line}`);
        console.log(`[ERR] ${line}`)
    }
};

export default Exception;