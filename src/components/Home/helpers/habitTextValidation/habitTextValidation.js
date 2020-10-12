import { inputValidation } from "../../../../helpers/validator/inputValidation";
import { showMessage } from "react-native-flash-message";
import { setItemtoAsyncStorage } from "../settingNewHabit/saveNewHabit";

export const habitTextValidation = (closeInputWindowCallback, callbackSetStateCheckbox, showValue, inputText, inputCheckbox) => 
{
    const valid = inputValidation(inputText);
    if(valid)
    {
        setItemtoAsyncStorage(inputText, inputCheckbox, callbackSetStateCheckbox, showValue);
        closeInputWindowCallback();
    } else 
    {
        const message = "Your title possibly misses letters or starts with whitespace"
        showMessage({
            message: message,
            type: "default"
        });
    }
}