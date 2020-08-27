import React from "react";
import  {    
            Text,
            StyleSheet
        } from "react-native";

import romanize from "../helpers/romanNumerals";

export default class Stage extends React.Component 
{
    constructor (props)
    {
        super(props);
    }
    
    currentStage = this.props.stage;

    stageStyle = () => {

        var color = "black";
        if(this.currentStage == 1)
            color = "#4F632D";
                else if (this.currentStage == 2)
                    color = "#693634";
                        else if (this.currentStage == 3)
                            color = "#7D6E00";
                                else if (this.currentStage == 4)
                                    color = "#7D544B";
                                        else if (this.currentStage == 5)
                                            color = "#9E8267"; 

    return {
            position: "absolute",
            top: "15%",
            left: "2.5%",
            fontFamily: "serif",
            color: color
        }
    }

    render() {
        return (
        <Text style={this.stageStyle()}>{romanize(this.props.stage)}</Text>
        );
    };
}
