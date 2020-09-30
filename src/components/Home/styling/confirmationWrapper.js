import { Dimensions } from 'react-native';

export const confirmationWrapper = () => 
    {    
        return {
            position: "absolute",
            backgroundColor: "rgba(217, 206, 193, 0.9)",
            height: Dimensions.get("screen").height,
            left: 0,
            right: 0,
            shadowColor: "rgba(217, 196, 171, 0.3)",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,


            elevation: 8,
            alignItems: 'center'
        }
    }