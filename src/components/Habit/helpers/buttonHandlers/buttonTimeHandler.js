import check_another_day from "../../../../helpers/time_processing/check_another_day";
import AsyncStorage from "@react-native-community/async-storage"

export const buttonTimeHandler = async (habitId, counter, buttonDisabled) =>
{
        var object = await AsyncStorage.getItem(habitId);
        
        if (counter < 21)
        {
            object = JSON.parse(object);
            
            var anotherDay = check_another_day(object);
            if(anotherDay)
            {
                buttonDisabled(false);
            } else 
            {
                buttonDisabled(true);
            }
        }
        //temp
        buttonDisabled(false);
        //
        if ( object.progress == 21 )
        {
            buttonDisabled(true);
        }
}