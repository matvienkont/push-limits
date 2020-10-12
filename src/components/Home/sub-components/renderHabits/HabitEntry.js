import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

import Stage from "../../../textComponents/Stage";

import React, { Component } from "react";
import { returnRemainingTime } from "../../../../helpers/time_processing/time_left_formatter";
import timeConverter from "../../../../helpers/time_processing/timeConverter";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { remainingTimeStyles, stageStylingForHome } from "../../styling/styles";

export default class HabitEntry extends Component 
{
    constructor(props)
    {
        super(props);
        
    }

    render () 
    {
        var {
            element,
            habitTitle,
            progressInPercent,
            currentStage,
            suffix,
            buttonAvailable,
            remainingTime
        } = this.props;
        return (
            <TouchableOpacity   style={ styles.habitTouchableOp } 
                                    key={"touchable"+suffix} 
                                    onPress = {() => this.props.toHabitScreen(element)}
                                    onLongPress={() => this.props.callConfirmationWindow(element)}
                >
                    { !buttonAvailable && returnRemainingTime(timeConverter(remainingTime), remainingTimeStyles)  }
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
        );
    }
};


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

});