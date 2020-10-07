import AsyncStorage from "@react-native-community/async-storage";

export const deleteHabit = async (habitId, renderChanges) =>
{
        try 
        {
            await AsyncStorage.removeItem(habitId);
        } catch (e)
        {
            console.log(e);
        }

        renderChanges();
}