import { inputValidation } from "../../../../../helpers/validator/inputValidation";
import { showMessage } from "react-native-flash-message";
import { saveChanges } from "./saveChanges";

export const validateTitleChanges = (habitId, inputText, inputCheckbox, callbackSetStateToggleEditMode, showValue) =>
{
    const valid = inputValidation(inputText);
    if(valid)
    {
        saveChanges(habitId, inputText, inputCheckbox, showValue)
        callbackSetStateToggleEditMode();
    } else 
    {
        const message = "Your title possibly misses letters or starts with whitespace"
        showMessage({
            message: message,
            type: "default"
        });
    }
}