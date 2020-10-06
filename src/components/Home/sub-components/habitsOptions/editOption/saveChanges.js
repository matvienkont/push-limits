import AsyncStorage from "@react-native-community/async-storage"

export const saveChanges = async (habitId, newTitle, resettable, callbackSetStateToggleEditMode, showValue) =>
{
    var data = await AsyncStorage.getItem(habitId);
    var object = JSON.parse(data);

    object.text = newTitle;
    object.resettable = resettable;
    
    try {
        const stringValue = JSON.stringify(object);
        await AsyncStorage.setItem(habitId, stringValue);
        var data = await AsyncStorage.getItem(habitId);
        await showValue();
    } catch(e) {
        console.log(e);
    }

    callbackSetStateToggleEditMode();
}