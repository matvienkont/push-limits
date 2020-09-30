import React from 'react';
import {
    View, 
    Text,
    Animated,
    StyleSheet, 
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import Bar from "./sub-components/Bar";

import Stage from "../textComponents/Stage";
import LinearGradient from 'react-native-linear-gradient';

import check_another_day from "../../helpers/time_processing/check_another_day";
import CentralButton from "./sub-components/CentralButton";
import { StatusBar } from "react-native";
import { optionsToNavigationBar } from "../navigation/helpers/optionsToNavigationBar";
import { stageStyling } from "./styling/stageStyling";
import ModalBox from "./sub-components/ModalBox";
import { triggerFlashMessage } from "./helpers/triggerFlashMessage";
import { fadeAnimationButton } from "./helpers/fadeAnimationButton";


class Habit extends React.Component 
{
    constructor(props) {
    super(props);

        this.state = {
            counter: 0,
            button_disabled: true,
            date_last_press: {},
            nextStageRequest: false,
            fadeAnim: new Animated.Value(0)
        }
        this.opacityRef = React.createRef();
        this.callRequest = React.createRef();
    }

    counterFunc = async () => {
        var object = await AsyncStorage.getItem(this.props.habitId);
        object = JSON.parse(object);

        if(object.stage == 5 && object.progress == 20)//last click while ending fifth stage
        {
            triggerFlashMessage();
            object.isActive = false;

        } else if ( object.progress == 20) //next stage initialisation
        {
            this.setState({
                nextStageRequest: true
            }, () => this.callRequest.current.triggerModal());
        }
        
        if( object.progress < 21)
        {
            object.progress += 1;
            object.last_button_press = new Date().getTime();

            var tempCounter = object.progress;

            object = JSON.stringify(object);
            await AsyncStorage.setItem(this.props.habitId, object);

            this.setState((state) => {
                return {
                button_disabled: true,
                counter: tempCounter
            }});
        }
	};

    returnButton = () => {
        if(!this.state.hidden)
        {
            return (<CentralButton 
                counterFunc={this.counterFunc.bind(this)} 
                button_disabled={this.state.button_disabled} 
                fadeAnim={this.state.fadeAnim}
                opacityRef={this.opacityRef}
            />)
        }
    }

    repeatNextStageRequestOnMount = async () =>
    {
        var object = await AsyncStorage.getItem(this.props.habitId);
        object = JSON.parse(object);

        if (object.progress == 21 && !(object.stage == 5)) //
        {
            this.setState({ 
                nextStageRequest: true
            }, () => this.callRequest.current.triggerModal());
        } else if (object.progress == 21 && object.stage == 5)
        {
            triggerFlashMessage();
        }
    }

    componentDidMount() 
    {
        fadeAnimationButton(Animated, this.state.fadeAnim);

        this.returnButton();

        this.handleButtonTime();

        this.repeatNextStageRequestOnMount();

        this.props.navigation.setOptions(optionsToNavigationBar);
        
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
        var object = await AsyncStorage.getItem(this.props.habitId);
        if ( this.state.counter < 21)
        {
            object = JSON.parse(object);
            
            var anotherDay = check_another_day(object);

            if(anotherDay)
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
        //temp
        this.setState({
                button_disabled: false
            });
        //
        if ( object.progress == 21 )
        {
            this.setState({
                button_disabled: true
            });
        }
    }

    handleNextStageQuery = async (willProceed) => 
    {
        if(!willProceed)
        {
            this.setState((state) => {  
                return {
                    nextStageRequest: !state.nextStageRequest
                }
            });
        } else 
        {
            var object = await AsyncStorage.getItem(this.props.habitId);
            object = JSON.parse(object);

            object.progress = 0;
            object.stage += 1;

            object = JSON.stringify(object);
            await AsyncStorage.setItem(this.props.habitId, object);

            this.setState((state) => { 
                return {
                        nextStageRequest: !(state.nextStageRequest),    
                        counter: 1
                       }
                }, () => { this.setState() });
        }
    }
    
    render() {
        return ( 
            <View style={{width: "100%", height: "100%"}}>
                <StatusBar backgroundColor='#877F7D' barStyle='light-content' />
            
                <ModalBox nextStageRequest={this.state.nextStageRequest} ref={this.callRequest} handleNextStageQuery={this.handleNextStageQuery.bind()}/>
                

            <View style={styles.border}>
                    <Bar key={this.state.counter} habitId={this.props.habitId}/>
                    { this.returnButton() }
                    <Text style={styles.habitTitle}>{this.props.habitTitle}</Text>
                    <View style={styles.stageWrapper}>
                        <Stage style={stageStyling} stage={this.props.habitStage} />
                        <LinearGradient style={styles.gradient} colors={['rgba(255, 255, 255, 0.25)', '#D9CEC1', '#D9CEC1']}></LinearGradient>
                    </View>
                    { this.props.getCounter(this.state.counter) }
                </View>
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
        color: "#66737D",
        paddingHorizontal: "4%"
    },
    powerIcon: {
        width: "100%",
        height: "100%",
        display: "none"
    }
});

export default Habit;