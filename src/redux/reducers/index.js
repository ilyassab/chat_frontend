import {combineReducers} from "redux";

import dialogs from "./dialogs";
import messages from "./messages";
import user from "./user";
import files from "./files";

export default combineReducers({
    dialogs,
    messages,
    user,
    files
})