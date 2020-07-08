import React, { Component } from 'react';
import {
    Dimensions,
    View, 
    StyleSheet,
    TouchableOpacity,
    Text
} from "react-native"

import Canvas from "react-native-canvas";
import Bar from "./Bar";

class Habit extends Component 
{
    constructor(props) {
    super(props);
        this.state = {
            list: [], 
            counter: 0,
            hidden: true,
            button_disabled: false,
            date_last_press: {}
        }
    }

    currentDate = new Date();

componentDidMount() 
{
    this.returnComponents();
    setTimeout(() => {
        this.setState({hidden: false});
    }, this.props.wait);
}

/*handleButtonTime = () => 
{   
    this.currentDate = new Date();
    if(!(Object.keys(this.state.date_last_press).length === 0 && this.state.date_last_press.constructor === Object))
    {
        this.currentDate.setSeconds(this.currentDate.getSeconds()-20);
        if(this.currentDate < this.state.date_last_press)
            console.log("You cannot");
        else if (this.state.button_disabled == true)
        {
            console.log("You can press now");
            this.setState(()=> 
            {
                return { button_disabled: false }
            }, () => this.forceUpdate());
        }
    }
        //dt.setSeconds( dt.getSeconds() + 20);
        // console.log(dt);
}*/


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

        return {
            left: center.x_loc,
            top: center.y_loc,
            height: 120,
            width: 120,
            borderRadius: 60,
            backgroundColor: '#D9C4AB',
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

    counterFunc = () => {

        if(this.state.counter <= 21) 
        this.setState((state) => {
            return {
            counter: state.counter + 1
        }});

        this.setState((state)=>
        {
            var dt = new Date();
            return {
                //button_disabled: true,
                date_last_press: new Date()
            }
        }, () => this.forceUpdate());
	};

    returnComponents = () => {
        if( !this.state.hidden )
        {
            if(this.state.button_disabled)
            {
                return (            
                        <TouchableOpacity
                                style={this.styleObjectForButton()}
                                onPress={this.counterFunc}
                                disabled={true}>
                            <Text style={styles.textStyle}>Nailed it</Text>
                        </TouchableOpacity>
                );
            } else
            {
                return (            
                        <TouchableOpacity
                                style={this.styleObjectForButton()}
                                onPress={this.counterFunc}>
                            <Text style={styles.textStyle}>Nailed it</Text>
                        </TouchableOpacity>
                );
            } 
        }
    }

    
    render() {
        return ( 
            <View style={styles.border}>
                <Bar key={this.state.counter} progress={this.state.counter}/>
                { console.log(this.currentDate, this.state.date_last_press) }
                { this.returnComponents() }
                { this.props.getCounter(this.state.counter) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50
    }
});

export default Habit;