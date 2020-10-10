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

import CentralButton from "./sub-components/CentralButton";
import { StatusBar } from "react-native";
import { optionsToNavigationBar } from "../navigation/helpers/optionsToNavigationBar";
import { stageStyling } from "./styling/stageStyling";
import ModalBox from "./sub-components/ModalBox";
import { triggerFlashMessage } from "./helpers/triggerFlashMessage";
import { fadeAnimationButton } from "./helpers/fadeAnimationButton";
import { buttonTimeHandler } from "./helpers/buttonHandlers/buttonTimeHandler";


class Habit extends React.Component 
{
    constructor(props) {
    super(props);

        this.state = {
            counter: 0,
            button_disabled: true,
            date_last_press: {},
            nextStageRequest: false,
            fadeAnim: new Animated.Value(0),
            currentStage: this.props.habitStage
        }
        this.opacityRef = React.createRef();
        this.callRequest = React.createRef();
    }

    returnButton = () => {
        if(!this.state.hidden)
        {
            return (<CentralButton 
                button_disabled={this.state.button_disabled} 
                fadeAnim={this.state.fadeAnim}
                opacityRef={this.opacityRef}
                habitId={this.props.habitId}
                initializeProceedRequest={this.initializeProceedRequest.bind(this)}
                setStateCounter={this.setStateCounter.bind(this)}
                setStateButtonDisabled={this.setStateButtonDisabled.bind(this)} 
            />)
        }
    }

    repeatNextStageRequestOnMount = async () =>
    {
        var object = await AsyncStorage.getItem(this.props.habitId);
        object = JSON.parse(object);

        if (object.progress == 21 && !(object.stage == 5)) //
        {
            this.initializeProceedRequest();
        } else if (object.progress == 21 && object.stage == 5)
        {
            triggerFlashMessage();
        }
    }

    componentDidMount() 
    {
        fadeAnimationButton(Animated, this.state.fadeAnim);

        this.returnButton();
        buttonTimeHandler(this.props.habitId, this.state.counter, this.setStateButtonDisabled.bind(this));

        this.repeatNextStageRequestOnMount();

        this.props.navigation.setOptions(optionsToNavigationBar);   
    }

    checkAvailabillity = setInterval(() => 
    { 
        buttonTimeHandler(this.props.habitId, this.state.counter, this.setStateButtonDisabled.bind(this));
        clearInterval(this);
    }, 15000);
    

    componentWillUnmount () 
    {
       clearInterval(this.checkAvailabillity); 
    }

    initializeProceedRequest = () => 
    {
        return this.setState({ 
            nextStageRequest: true
        }, () => this.callRequest.current.triggerModalOpening());
    }

    setStateCounter = (value) => 
    {
        return this.setState({ counter: value })
    }

    setStateButtonDisabled = (value) =>
    {
        return this.setState({
            button_disabled: value
        }); 
    }

    refreshStageCallback = (value) =>
    {
        return this.setState({ currentStage: value });
    }

    callbackProceedRequestDeclined = () =>
    {
        return this.setState((state) => { return {
                                            nextStageRequest: !state.nextStageRequest
                                        }}, () => { this.setState() });
    }

    callbackProceedRequest = () =>
    {
        return this.setState((state) => { return {
                                            nextStageRequest: !(state.nextStageRequest),    
                                            counter: 1
                                        }}, () => { this.setState() });       
    }


    
    render() {
        return ( 
            <View style={{width: "100%", height: "100%"}}>
                <StatusBar backgroundColor='#877F7D' barStyle='light-content' />
            
                <ModalBox 
                    ref={this.callRequest} 
                    refreshStageCallback={this.refreshStageCallback.bind(this)}
                    callbackProceedRequestDeclined={this.callbackProceedRequestDeclined.bind(this)}
                    callbackProceedRequest={this.callbackProceedRequest.bind(this)}
                    habitId={this.props.habitId}
                    callRequest={this.callRequest}
                />
                

            <View style={styles.border}>
                    <Bar key={this.state.counter} habitId={this.props.habitId}/>
                    { this.returnButton() }
                    <Text style={styles.habitTitle}>{this.props.habitTitle}</Text>
                    <View style={styles.stageWrapper}>
                        <Stage style={stageStyling} stage={this.state.currentStage} />
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