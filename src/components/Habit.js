import React, { Component, createRef } from 'react';
import {
    Dimensions,
    View, 
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated
} from "react-native"

import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from "react-native-device-info";
import Bar from "./Bar";

import { dynamicButtonParameters } from "../helpers/buttonParameters";

class Habit extends Component 
{
    constructor(props) {
    super(props);

        this.state = {
            list: [], 
            counter: 0,
            button_disabled: true,
            date_last_press: {},
            fadeAnim: new Animated.Value(0)
        }
        this.opacityRef = React.createRef();
    }

    styleObjectForButton = () => {
        
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        const center = dynamicButtonParameters(screenWidth, screenHeight);

        var colour = this.state.button_disabled ? "rgba(217, 196, 171, 0.4)" : "rgba(217, 196, 171, 1)";
        
        if(this.state.button_disabled) 
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

    textStyleForButton = () =>
    {
        var textColour = this.state.button_disabled ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 1)";

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

    counterFunc = async () => {
        var object = await AsyncStorage.getItem(this.props.habitId);
        object = JSON.parse(object);
        
        if( object.progress < 21)
        {
            object.progress += 1;
            object.last_button_press = new Date().getTime();

            var tempCounter = object.progress;

            object = JSON.stringify(object);
            await AsyncStorage.setItem(this.props.habitId, object);

            if(this.state.counter < 21) 
            this.setState((state) => {
                return {
                button_disabled: true,
                counter: tempCounter
            }});
        }
	};

    returnButton = () => {
        if(!this.state.hidden)
            return (
                
                    <>      
                    <Animated.View
                        style= {
                                {
                                    opacity: this.state.fadeAnim // Bind opacity to animated value
                                }}>
                        <View
                                style={this.styleObjectForButton()}>
                            <Text style={this.textStyleForButton()}>Nailed it</Text>
                        </View>
                    </Animated.View>
                    <TouchableOpacity 
                        style={ this.styleObjectForButtonWrapper() }
                        onPress={ this.counterFunc }
                        disabled={this.state.button_disabled} 
                        ref={this.opacityRef} 
                        activeOpacity={0.03}>
                    </TouchableOpacity>
                    </>
                );      
    }

    componentDidMount() 
    {
        Animated.timing(
            this.state.fadeAnim,
            { 
                toValue: 1,
                duration: 1500,
                useNativeDriver: true 
            }
            ).start();

        this.returnButton();

        this.handleButtonTime();

        this.props.navigation.setOptions({
            headerStyle: { 
                            backgroundColor: '#D9CEC1', 
                            height: DeviceInfo.hasNotch() ? 110 : 60 
                        },
            headerTitleStyle: 
                            {
                                paddingTop: DeviceInfo.hasNotch() ? 30 : 0 
                            }
            });
    }

    checkAvailabillity = setInterval(() => 
        { 
            this.handleButtonTime();
            clearInterval(this);
        }, 15000);
    

    componentWillUnmount () 
    {
       clearInterval(this.checkAvailabillity); 
    }

    handleButtonTime = async () => 
    {   
        if ( this.state.counter < 21)
        {
            var object = await AsyncStorage.getItem(this.props.habitId);
            object = JSON.parse(object);

            var currentDate = new Date().getTime()
            if(currentDate - object.last_button_press > 10000)
            {
                this.setState({
                    button_disabled: false
                });
            } else 
            {
                this.setState({
                    button_disabled: true
                });
            }
        }
    }
    
    render() {
        return ( 
            <View style={styles.border}>
                <Bar key={this.state.counter} habitId={this.props.habitId}/>
                { this.returnButton() }
                <Text style={styles.habitTitle}>{this.props.habitTitle}</Text>
                { this.props.getCounter(this.state.counter) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50
    },
    habitTitle: {
        textAlign: "center",
        marginTop: "10%",
        fontWeight: 'normal',
		fontFamily: "Roboto", 
        fontSize: 16,
        color: "#66737D"
    }
});

export default Habit;