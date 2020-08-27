import React from 'react';
import {
    Dimensions,
    View, 
    TouchableOpacity,
    Text,
    Animated,
} from "react-native"

import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from "react-native-device-info";
import Bar from "./Bar";

import { dynamicButtonParameters } from "../helpers/buttonParameters";
import Modal from "react-native-modalbox";
import power from "../icons/power.png";
import { showMessage } from 'react-native-flash-message';

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

        if(object.stage == 5 && object.progress == 20)//last click while ending fifth stage
        {
            const habitGained = `   My genuine congratulations !
   Willpower is with you.`

            showMessage({
                message: habitGained,
                type: "success",
                animationDuration: 1500,
                duration: 2500
            });

            object.isActive = false;

        } else if ( object.progress == 20) //next stage initialisation
        {
            this.setState({ 
                nextStageRequest: true
            }, () => this.refs.requestModal.open());
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

    repeatNextStageRequestOnMount = async () =>
    {
        var object = await AsyncStorage.getItem(this.props.habitId);
        object = JSON.parse(object);

        if (object.progress == 21 && !(object.stage == 5)) //
        {
            this.setState({ 
                nextStageRequest: true
            }, () => this.refs.requestModal.open());
        }
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

        this.repeatNextStageRequestOnMount();

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
        var object = await AsyncStorage.getItem(this.props.habitId);
        if ( this.state.counter < 21)
        {
            object = JSON.parse(object);
            
            //button available again in 8 hours
            const EIGHT_HOURS = 1000//28800000;

            var currentDate = new Date().getTime()
            if(currentDate - object.last_button_press > EIGHT_HOURS)
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
            console.log("NO PROCEED", willProceed);
            this.setState((state) => {  
                return {
                    nextStageRequest: !state.nextStageRequest
                }
            });
        } else 
        {
            console.log("PROCEED", willProceed);
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
                <Modal
                    style={styles.modalWrapper}
                    deviceWidth={Dimensions.get("window").width}
                    deviceHeight={Dimensions.get("window").height}
                    backdrop={false}
                    ref={"requestModal"} 
                    isOpen={this.state.nextStageRequest}>
                    <View style={styles.wrapperRigthAfterModal}>
                        <View style={styles.containerView}>
                            <Text style={styles.completeMessage}>Wow! You completed the stage of your new habit ! 
                            Do you want to make the habit really <Text style={styles.toughWord}>tough</Text> to break ?</Text>
                                <View style={styles.opacityWrapper}>
                                    <TouchableOpacity
                                        style={[styles.opacities, styles.yesOpacity]}
                                        onPress={() => this.handleNextStageQuery(true)} 
                                    >
                                            <Text style={styles.options}>YES</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.opacities, styles.noOpacity]}
                                        onPress={() => this.handleNextStageQuery(false)}
                                        >
                                        <Text style={styles.options}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                        </View>
                </Modal>
            <View style={styles.border}>
                    <Bar key={this.state.counter} habitId={this.props.habitId}/>
                    { this.returnButton() }
                    <Text style={styles.habitTitle}>{this.props.habitTitle}</Text>
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
        color: "#66737D"
    },
    powerIcon: {
        width: "100%",
        height: "100%",
        display: "none"
    },
    completeMessage: {
        marginBottom: "5%",
        textAlign: "center",
        fontSize: 15
    },
    options: {
        fontSize: 16    
    },
    opacities: {
        borderWidth: 1,
        width: "35%",
        alignItems: "center",
        marginHorizontal: "4%",
        paddingVertical: "1.5%",
        borderRadius: 2
    },
    yesOpacity: {
        backgroundColor: "rgba(0, 232, 15, 0.02)"
    },
    noOpacity: {
        backgroundColor: "rgba(217, 57, 22, 0.02)"
    },
    opacityWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    modalWrapper: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    wrapperRigthAfterModal: {
        flex: 1,
        alignItems: "center"
    },
    containerView: {
        width: "80%", 
        padding: "5%",
        marginTop: "5%",
        borderRadius: 5,
        backgroundColor: "#C2B8AC"
    },
    toughWord: {
        color: "#420000",
        fontWeight: "bold"
    }
});

export default Habit;























