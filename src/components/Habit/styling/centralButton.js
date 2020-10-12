import { Dimensions } from "react-native";
import { dynamicButtonParameters } from "../../../helpers/positionParameters/buttonParameters";

export const styleObjectForButtonWrapper = () => {
        
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

export const textStyleForButton = (button_disabled) =>
{
    var textColour = button_disabled ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 1)";

    return {
        alignSelf: 'center',
        color: textColour,
        fontFamily: "monospace",
        fontSize: 15,
        fontWeight: '900',
        paddingTop: 10,
        paddingBottom: 10,
    }
}

export const styleObjectForButton = (button_disabled) => {
        
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const center = dynamicButtonParameters(screenWidth, screenHeight);

    var colour = button_disabled ? "rgba(217, 196, 171, 0.4)" : "rgba(217, 196, 171, 1)";
    
    if(button_disabled) 
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