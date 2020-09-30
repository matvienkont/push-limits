import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

import React from "react";

import Stage from "../../../textComponents/Stage";
import timeConverter from "../../../../helpers/time_processing/timeConverter";
import check_another_day from "../../../../helpers/time_processing/check_another_day";

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const stageStylingForHome = () => 
    {  
        return {
                position: "absolute",
                top: "45%",
                left: "2.5%",
                fontFamily: "serif",
                fontSize: 16
        }
    }

const returnRemainingTime = (time) =>
{ 
    //check if time is not empty
    if(time)
    {
        if(time.length === 2)
        {
            return (
                <Text style={remainingTimeStyles(3.3)}>{time}</Text>
            ); 
        } else if (time.length >= 6)
        {
            return (
                <Text style={remainingTimeStyles(1)}>{time}</Text>
            ); 
        } else 
            {
                if (time.includes("h"))
                {
                    return (
                        <Text style={remainingTimeStyles(1.6)}>{time}</Text>
                    );
                } else if(time.includes("m")) 
                {
                    return (
                        <Text style={remainingTimeStyles(1.6)}>{time}</Text>
                    );
                } else 
                    {
                        return (
                            <Text style={remainingTimeStyles(2.7)}>{time}</Text>
                        );
                    }
            }
    }
}

const remainingTimeStyles = (margin, rightPosition) => 
{
    margin = `${margin}%`;
    return {
        fontSize: 8,
        position: "absolute",
        right: margin,
        bottom: 0,
        marginRight: "1.5%",
        opacity: 0.5
    }
}

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
            
            var remainingTime = nextDayIn.getTime() - currentDate;
            //variable that contains remaining time under Progress Circle in application
        } else {
            buttonAvailable = false;
        }
        
            return (
                <TouchableOpacity   style={ styles.habitTouchableOp } 
                                    key={"touchable"+suffix} 
                                    onPress = {() => toHabitScreen(element)}
                                    onLongPress={() => callConfirmationWindow(element)}
                >
                    { !buttonAvailable && returnRemainingTime(timeConverter(remainingTime))  }
                    <View 
                        key={"view"+suffix} style={styles.habitView}>
                        <Stage style={stageStylingForHome()} stage={currentStage}/>
                        <Text key={"text"+suffix} style={styles.habitText}>
                            { habitTitle }
                        </Text>  
                        
                        <AnimatedCircularProgress
                        size={ buttonAvailable ? 30 : 20 }
                        width={ buttonAvailable ? 9 : 7}
                        fill={ progressInPercent }
                        tintColor= { buttonAvailable ? "#FFF" : "#D9CEC1" } 
                        backgroundColor={ buttonAvailable ? "#595959" : "#969696" } />
                                        
                    </View>
                </TouchableOpacity>
            )
        })
}

const styles = StyleSheet.create({
    habitTouchableOp: {
        backgroundColor: "#E0D5C8",
        alignItems: "center",
        minHeight: 50,
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 7
    },
    habitView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        paddingVertical: 10
    },
    habitText: {
        fontFamily: "normal",
        fontSize: 16,
        color: "#66493D",
        paddingLeft: "6%",
        paddingRight: "5%",
        width: "85%",
        textAlign: "center"
    }

})