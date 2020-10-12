import AsyncStorage from "@react-native-community/async-storage";

export const handleNextStageQuery = async (willProceed, habitId, SetStateProceedRequest, SetStateProceedRequestDeclined, callRequest) => 
{
    if(!willProceed)
    {
        SetStateProceedRequestDeclined();
        callRequest.current.triggerModalClosing();
    } else 
    {
        var object = await AsyncStorage.getItem(habitId);
        object = JSON.parse(object);

        object.progress = 0;
        object.stage += 1;

        object = JSON.stringify(object);
        await AsyncStorage.setItem(habitId, object);

        SetStateProceedRequest();
        callRequest.current.triggerModalClosing();
    }
}