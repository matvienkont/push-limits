import AsyncStorage from "@react-native-community/async-storage";

export const setItemtoAsyncStorage = async (inputText, inputCheckbox, callbackSetStateCheckbox, showValue) =>
{
    const value = {
        text: inputText,
        progress: 0,
        stage: 1,
        date: Date.now(),
        last_button_press: '' ,
        isActive: true,
        resettable: inputCheckbox  
    }

    callbackSetStateCheckbox(false);

    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        showValue();
    } catch(e) {
        console.log(e);
    }
}