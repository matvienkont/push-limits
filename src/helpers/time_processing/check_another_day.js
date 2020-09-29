export default check_another_day = (object) => 
{
    const currentDate = new Date().getTime();
    const lastPress = object.last_button_press;

    const lastPressDay = new Date(lastPress).getDay();
    const currentTimeDay = new Date(currentDate).getDay();


    return lastPressDay !== currentTimeDay ? true : false;
}