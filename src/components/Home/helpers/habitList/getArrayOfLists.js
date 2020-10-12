import AsyncStorage from '@react-native-community/async-storage';

export const getArrayOfLists = async () => 
{
    var temp = await AsyncStorage.getAllKeys();
    var data = await AsyncStorage.multiGet(temp);
    var resetCounter = 0;
    
    data.forEach(element => 
        {
            element[1] = JSON.parse(element[1]);
            if(element[1].last_button_press && element[1].resettable)
            {
                var currentDate = new Date().getTime()
                const timeToReset = 88200000; //24.5 hours
                if(currentDate - element[1].last_button_press > timeToReset)
                {
                    element[1].progress = 0;
                    element[1].last_button_press = '';
                    resetCounter += 1;
                    object = JSON.stringify(element[1]);
                    AsyncStorage.setItem(element[0], object);
                }
            }
        });
    
        data.sort((a,b) => b[1].date - a[1].date);

    return { data: data, resetCounter: resetCounter };
}