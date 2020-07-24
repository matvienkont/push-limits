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
import Bar from "./Bar";

class Habit extends Component 
{
    constructor(props) {
    super(props);

        this.state = {
            list: [], 
            counter: 0,
            hidden: false,
            button_disabled: true,
            date_last_press: {},
            fadeAnim: new Animated.Value(0)
        }
        this.opacityRef = React.createRef();
    }

    returnCenter = () => {
        return {
            x: Dimensions.get('window').width/2,
            y: Dimensions.get('window').height/2
        }    
    }

    styleObjectForButton = () => {
        var center = {
            x_loc: this.returnCenter().x-58,
            y_loc: this.returnCenter().y+36
        };

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
        var center = {
            x_loc: this.returnCenter().x-58,
            y_loc: this.returnCenter().y+36
        };

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

            if(this.state.counter <= 21) 
            this.setState((state) => {
                return {
                button_disabled: true,
                counter: tempCounter
            }});
        }
	};

    returnComponents = () => {
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
            // Uses easing functions
            this.state.fadeAnim, // The value to drive
            { 
                toValue: 1,
                duration: 1500,
                useNativeDriver: true 
            } // Configuration
            ).start();

        this.returnComponents();

        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.wait);

        this.handleButtonTime();
    }

    handleButtonTime = async () => 
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
    
    render() {
        return ( 
            <View style={styles.border}>
                <Bar key={this.state.counter} habitId={this.props.habitId}/>
                { this.returnComponents() }
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
    }
});

export default Habit;