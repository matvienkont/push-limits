import React from "react";
import { Animated,
         View,
         TouchableOpacity,
         Text } from "react-native";

import { counterFunc } from "../helpers/buttonHandlers/counterFunc";
import { textStyleForButton, styleObjectForButton, styleObjectForButtonWrapper } from "../styling/centralButton";

export default class CentralButton extends React.Component
{
    render()
    {
        var {
            habitId,
            setStateCounter,
            setStateButtonDisabled,
            initializeProceedRequest,
            button_disabled,
            opacityRef,
            fadeAnim
        } = this.props;

        return (
            <>      
            <Animated.View
                style= {
                        {
                            opacity: fadeAnim // Bind opacity to animated value
                        }}>
                <View
                        style={styleObjectForButton(button_disabled)}>
                    <Text style={textStyleForButton(button_disabled)}>Nailed it</Text>
                </View>
            </Animated.View>
            <TouchableOpacity 
                style={styleObjectForButtonWrapper()}
                onPress={() => counterFunc(habitId, initializeProceedRequest, setStateCounter, setStateButtonDisabled) }
                disabled={button_disabled} 
                ref={opacityRef} 
                activeOpacity={0.03}>
            </TouchableOpacity>
            </>
        );
    }

}