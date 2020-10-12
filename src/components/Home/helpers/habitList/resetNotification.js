import { showMessage } from "react-native-flash-message";

export const resetNotification = (resetCounter) =>
{
    var message = "";
    if (resetCounter == 1)
        message = "One of your habits was reset";
    else
        message = `${resetCounter} of your habits were reset`;
        
    if(resetCounter)
    {
        showMessage({
            message: message,
            type: "default",
        });
    }
}