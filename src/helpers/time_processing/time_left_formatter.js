import React from "react";
import { Text } from "react-native";

export const returnRemainingTime = (time, remainingTimeStyles) =>
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