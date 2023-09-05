import { onSiteLoadIfAuthorized } from "../../Router/testing.js";
import { createInfoMessage } from "../../Errors/fetch-errors.js";

createInfoMessage("Step in - REGISTER page.");
onSiteLoadIfAuthorized(true);