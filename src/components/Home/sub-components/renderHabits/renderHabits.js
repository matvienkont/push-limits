import check_another_day from "../../../../helpers/time_processing/check_another_day";
import HabitEntry from "./HabitEntry";
import React from "react";

export const renderHabits = (habits, toHabitScreen, callConfirmationWindow) => 
{
    var processedHabits = [];
    var suffix = -1;
    return processedHabits = habits.map((element, index) => {
        suffix += 1;
        var OBJECT = element[1];    
        var habitTitle = OBJECT.text;
        const progressInPercent = Math.ceil(OBJECT.progress/21 * 100);
        var remainingTime = 0;
        var buttonAvailable = false;
        const currentDate = new Date().getTime();
        const currentStage = OBJECT.stage;
        const lastPress = OBJECT.last_button_press;
        const anotherDate = check_another_day(OBJECT);
        if(anotherDate && OBJECT.isActive)
        {
            buttonAvailable = true;
        } else if (OBJECT.isActive)
        {
            const formattedLastPress = new Date(lastPress);
            var nextDayIn = new Date(formattedLastPress.getFullYear(), formattedLastPress.getMonth(), formattedLastPress.getDate()+1, 0, 0, 0);
            
            remainingTime = nextDayIn.getTime() - currentDate;
            //variable that contains remaining time under Progress Circle in the application
        } else {
            buttonAvailable = false;
        }
        
            return (
                <HabitEntry
                    element={element}
                    habitTitle={habitTitle}
                    progressInPercent={progressInPercent}
                    currentStage={currentStage}
                    suffix={suffix}
                    buttonAvailable={buttonAvailable}
                    remainingTime={remainingTime}
                    toHabitScreen={toHabitScreen}
                    callConfirmationWindow={callConfirmationWindow}
                    key={"entry"+suffix}
                />
            )
        })
}
