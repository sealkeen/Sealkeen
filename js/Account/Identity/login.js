import { onSiteLoadIfAuthorized } from "../../Router/testing.js";
import { createInfoMessage } from "../../../Sealkeen/js/Errors/fetch-errors.js";

createInfoMessage("Step in - login page.");
onSiteLoadIfAuthorized(true);