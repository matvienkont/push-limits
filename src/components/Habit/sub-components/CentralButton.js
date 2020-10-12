import React from "react";
import { Dimensions,
         Animated,
         View,
         TouchableOpacity,
         Text } from "react-native";

import { counterFunc } from "../helpers/buttonHandlers/counterFunc";
import { textStyleForButton, styleObjectForButtonWrapper } from "../styling/centralButton";

export default class CentralButton extends React.Component
{
    styleObjectForButton = () => {
        
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        const center = dynamicButtonParameters(screenWidth, screenHeight);

        var colour = this.props.button_disabled ? "rgba(217, 196, 171, 0.4)" : "rgba(217, 196, 171, 1)";
        
        if(this.props.button_disabled) 
        {
            return {
                left: center.x_loc,
                top: center.y_loc,
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: colour,
                justifyContent: 'center',
                position: "absolute",
            }
        } else {
            return {
                left: center.x_loc,
                top: center.y_loc,
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: colour,
                justifyContent: 'center',
                position: "absolute",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,

                elevation: 1,
            }
        }
    }



    styleObjectForButtonWrapper = () => {
        
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        const center = dynamicButtonParameters(screenWidth, screenHeight);

            return {
                left: center.x_loc,
                top: center.y_loc,
                height: 120,
                width: 120,
                borderRadius: 60,
                backgroundColor: "rgb(0, 0, 0)",
                opacity: 0,
                justifyContent: 'center',
                position: "absolute",
            }
    }

    render()
    {
        var {
            habitId,
            setStateCounter,
            setStateButtonDisabled,
            initializeProceedRequest
        } = this.props;

        return (
            <>      
            <Animated.View
                style= {
                        {
                            opacity: this.props.fadeAnim // Bind opacity to animated value
                        }}>
                <View
                        style={this.styleObjectForButton()}>
                    <Text style={textStyleForButton(this.props.button_disabled)}>Nailed it</Text>
                </View>
            </Animated.View>
            <TouchableOpacity 
                style={ styleObjectForButtonWrapper() }
                onPress={() => counterFunc(habitId, initializeProceedRequest, setStateCounter, setStateButtonDisabled) }
                disabled={this.props.button_disabled} 
                ref={this.props.opacityRef} 
                activeOpacity={0.03}>
            </TouchableOpacity>
            </>
        );
    }

}