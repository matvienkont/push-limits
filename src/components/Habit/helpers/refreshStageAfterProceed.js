import AsyncStorage from "@react-native-community/async-storage"

export const refreshStageAfterProceed = async (habitId, refreshStageCallback) =>
{
    var object = await AsyncStorage.getItem(habitId);
    object = JSON.parse(object);

    return refreshStageCallback(object.stage+1)
} 