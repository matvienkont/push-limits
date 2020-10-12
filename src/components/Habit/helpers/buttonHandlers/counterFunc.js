import triggerFlashMessage from "../triggerFlashMessage";
import AsyncStorage from "@react-native-community/async-storage";

export const counterFunc = async (habitId, initializeProceedRequest, setStateCounter, setStateButtonDisabled ) => {
    var object = await AsyncStorage.getItem(habitId);
    object = JSON.parse(object);

    if(object.stage == 5 && object.progress == 20)//last click while ending fifth stage
    {
        triggerFlashMessage();
        object.isActive = false;

    } else if ( object.progress == 20) //next stage initialisation
    {
        initializeProceedRequest();
    }
    
    if( object.progress < 21)
    {
        object.progress += 1;
        object.last_button_press = new Date().getTime();

        var tempCounter = object.progress;

        object = JSON.stringify(object);
        await AsyncStorage.setItem(habitId, object);

        setStateCounter(tempCounter);
        setStateButtonDisabled(true);
    }
};