import React  from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';

import Stage from "./textComponents/Stage";

import CheckBox from '@react-native-community/checkbox';

import PlusIcon from '../icons/plus-circle-512.png';
import GoIcon from '../icons/go.png';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DeviceInfo from "react-native-device-info";
import { showMessage } from "react-native-flash-message";

import timeConverter from "../helpers/time_processing/timeConverter";


class Home extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            habits: [],
            deleteRequest: false,
            deleteRequestHabit: '',
            inputWindow: false,
            inputText: '',
            inputCheckbox: false
        };

        this.checkboxRef = React.createRef();
    }

    unsubscribe = this.props.navigation.addListener('focus', () => {
        this.showValue();
    });

    showValue = async () => 
    {
        try {
            var temp = await AsyncStorage.getAllKeys();
            var data = await AsyncStorage.multiGet(temp);
            var resetCounter = 0;
            
            data.forEach(element => 
                {
                    element[1] = JSON.parse(element[1]);

                    if(element[1].last_button_press && element[1].resettable)
                    {
                        var currentDate = new Date().getTime()
                        const timeToReset = 88200000; //24.5 hours

                        if(currentDate - element[1].last_button_press > timeToReset)
                        {
                            element[1].progress = 0;
                            element[1].stage = 1;
                            element[1].last_button_press = '';
                            resetCounter += 1;
    
                            object = JSON.stringify(element[1]);
                            AsyncStorage.setItem(element[0], object);
                        }
                    }
                });
            
                
            
            data.sort((a,b) => b[1].date - a[1].date)
            
            this.setState({ habits: data }, () => 
                                            {
                                                var message = "";
                                                if (resetCounter == 1)
                                                    message = "One of your habits was reset";
                                                else 
                                                    message = `${resetCounter} of your habits were reset`;

                                                if(resetCounter)
                                                {
                                                    showMessage({
                                                        message: message,
                                                        type: "default",
                                                    });
                                                }
                                            });    
        } catch (e)
        {
            console.log(e);
        }
    }

    confirmationWrapper = () => 
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

    toHabitScreen = (element) => {
        const habitId = element[0];
        const habitTitle = element[1].text;
        const habitStage = element[1].stage;

        const { navigation } = this.props;
        navigation.navigate("Habit", { habitId, habitTitle, habitStage });
    }
    
    callConfirmationWindow = (element) => 
    {   
        this.setState({
            deleteRequest: true,
            deleteRequestHabit: element
        });
    }

    deleteHabit = async () => 
    {
        let habitId = this.state.deleteRequestHabit[0];
        try 
        {
            await AsyncStorage.removeItem(habitId);
        } catch (e)
        {
            console.log(e);
        }

        this.showValue();
        this.setState({ deleteRequest: false });
    }

    returnConfirmationWindow = () =>
    {
        if (this.state.deleteRequest)
        {
        let habitTitle = this.state.deleteRequestHabit[1].text;
            return (
                <View style={this.confirmationWrapper()} >
                    <View style={styles.styleConfirmationWindow} >
                        <View style={styles.habitTitleDeleteRequestWrapper} >
                            <Text style={ styles.habitTitleDeleteRequest }>{habitTitle}</Text>
                        </View>    
                        <TouchableOpacity style={styles.deleteButton} onPress={() => this.deleteHabit() }>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ deleteRequest: false })}>
                            <Text style={styles.buttonText}>Keep it</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    textInputSubmit = (text) => 
    {
        if (text)
            {
                const regex = /^\w+/;
                var result = regex.test(text);
                
                if(result)
                    this.setItemtoAsyncStorage(text);
            }
        
        
        this.textInput.clear(); 
        
        this.setState({ inputWindow: false })
    }

    showInputWindow = () => 
    {
        return (
            <View scrollEnabled={false} style={this.confirmationWrapper()}>
                <View scrollEnabled={false} style={styles.styleConfirmationWindow} >
                    <TextInput 
                                autoFocus
                                style={styles.habitInput}
                                returnKeyType='done'
                                maxLength={50}
                                onSubmitEditing={(event) => this.textInputSubmit(event.nativeEvent.text) }
                                onChangeText={(text)=> this.setState({ inputText: text}) }
                                placeholder="Enter habit"
                                ref={input => { this.textInput = input }}
                                paddingRight={42}
                                >
                        
                    </TextInput>
                        <TouchableOpacity style={styles.goIconWrapper} onPress={() => this.textInputSubmit(this.state.inputText)}>
                            <Image
                                    style={styles.goIcon}
                                    source={GoIcon}
                                />
                        </TouchableOpacity>
                        <View style={styles.checkboxView}>
                            <CheckBox
                                disabled={false}
                                value={this.state.inputCheckbox}
                                onValueChange={() => this.setState((state) => { return { inputCheckbox: !state.inputCheckbox }})}
                                ref={this.checkboxRef}
                            />
                            <Text onPress=  {
                                                () => 
                                                { 
                                                    this.setState((state) => { return { inputCheckbox: !state.inputCheckbox }})
                                                }
                                            }>
                                    Reset progress on missed day
                            </Text>
                        </View>
                    <TouchableOpacity style={styles.cancelInput} onPress={() => this.setState({ inputWindow: false })}>
                            <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                    
            </View>
        );
    }

    componentDidMount()
    {
        this.showValue(); 
        this.props.navigation.setOptions({
            headerRight: () => (
                    <TouchableOpacity onPress={() => 
                                                { 
                                                    if(!this.state.deleteRequest) 
                                                        this.setState({ inputWindow: true })
                                                }} >
                        <Image
                            style={styles.plusIcon}
                            source={PlusIcon}
                        />
                    </TouchableOpacity>
                ),
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

    stageStylingForHome = () => 
    {  
        return {
                position: "absolute",
                top: "45%",
                left: "2.5%",
                fontFamily: "serif",
                fontSize: 16
        }
    }

    renderHabits = () => 
    {
        if(this.state.habits.length > 0) 
        {
            var suffix = -1; 
            return this.state.habits.map((element, index) => {
                        suffix += 1;
                        var habitTitle = element[1].text;
                        var progressInPercent = Math.ceil(element[1].progress/21 * 100);
                        var remainingTime = 0;
                        var buttonAvailable = false;
                        var currentDate = new Date().getTime();
                        var currentStage = element[1].stage;
                        const lastPress = element[1].last_button_press;

                        const lastPressDate = new Date(lastPress).getDate();
                        const currentTimeDate = new Date(currentDate).getDate();

                        const anotherDate = lastPressDate !== currentTimeDate ? true : false;

                        if(anotherDate && element[1].isActive)
                        {
                            buttonAvailable = true;
                        } else if (element[1].isActive)
                        {
                            const formattedLastPress = new Date(lastPress);
                            var nextDayIn = new Date(formattedLastPress.getFullYear(), formattedLastPress.getMonth(), formattedLastPress.getDate()+1, 0, 0, 0);
                            
                            var remainingTime = nextDayIn.getTime() - currentDate;
                            //variable that contains remaining time under Progress Circle in application
                        } else {
                            buttonAvailable = false;
                        }
                        
                            return (
                                <TouchableOpacity   style={ styles.habitTouchableOp } 
                                                    key={"touchable"+suffix} 
                                                    onPress = {() => this.toHabitScreen(element)} 
                                                    onLongPress={() => this.callConfirmationWindow(element)}
                                >
                                    { !buttonAvailable && this.returnRemainingTime(timeConverter(remainingTime))  }
                                    <View 
                                        key={"view"+suffix} style={styles.habitView}>
                                        <Stage style={this.stageStylingForHome()} stage={currentStage}/>
                                        <Text key={"text"+suffix} style={styles.habitText}>
                                            { habitTitle }
                                        </Text>  
                                        

                                        <AnimatedCircularProgress
                                        size={ buttonAvailable ? 30 : 20 }
                                        width={ buttonAvailable ? 9 : 7}
                                        fill={ progressInPercent }
                                        tintColor= { buttonAvailable ? "#FFF" : "#D9CEC1" } 
                                        backgroundColor={ buttonAvailable ? "#595959" : "#969696" } />
                                                        
                                    </View>
                                </TouchableOpacity>
                            ) 
                        })                 
        }
    }
    
    remainingTimeStyles = (margin, rightPosition) => 
    {
        margin = `${margin}%`;
        return {
            fontSize: 8,
            position: "absolute",
            right: margin,
            bottom: 0,
            marginRight: "1.5%",
            opacity: 0.5
        }
    }

    returnRemainingTime = (time) =>
    { 
        //check if time is not empty
        if(time)
        {
            if(time.length === 2)
            {
                return (
                    <Text style={this.remainingTimeStyles(3.3)}>{time}</Text>
                ); 
            } else if (time.length >= 6)
            {
                return (
                    <Text style={this.remainingTimeStyles(1)}>{time}</Text>
                ); 
            } else 
                {
                    if (time.includes("h"))
                    {
                        return (
                            <Text style={this.remainingTimeStyles(1.6)}>{time}</Text>
                        );
                    } else if(time.includes("m")) 
                    {
                        return (
                            <Text style={this.remainingTimeStyles(1.6)}>{time}</Text>
                        );
                    } else 
                        {
                            return (
                                <Text style={this.remainingTimeStyles(2.7)}>{time}</Text>
                            );
                        }
                }
        }
    }

    checkAvailabillity = setInterval(() => 
    { 
        this.setState({});
        this.showValue();
        clearInterval(this);
    }, 100000);


    componentWillUnmount () 
    {
        clearInterval(this.checkAvailabillity); 
    }

    setItemtoAsyncStorage = async (text) => 
    {
        const value = {
            text: text,
            progress: 20,
            stage: 5,
            date: Date.now(),
            last_button_press: '' ,
            isActive: true,
            resettable: this.state.inputCheckbox  
        }

        this.setState({ inputCheckbox: false });

        const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            this.showValue();
        } catch(e) {
            console.log(e);
        }
    }

    render () 
    {
        return (
            <View>
                <ScrollView style={styles.scrollViewHome} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="always">
                <View style={ styles.fullWidth }> 
                    { this.renderHabits() }
                </View>
				</ScrollView>

            { this.state.inputWindow && this.showInputWindow() }
            { this.returnConfirmationWindow() }
            </View>
        );
    }
}



const styles = StyleSheet.create({
    habitInput: {
        backgroundColor: "white",
        
        width: "90%",
        borderRadius: 10,
        height: "25%",
    },
    habitTouchableOp: {
        backgroundColor: "#E0D5C8",
        alignItems: "center",
        minHeight: 50,
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 7
    },
    fullWidth: {
        width: "100%",
        marginTop: "3%"
    },
    habitText: {
        fontFamily: "normal",
        fontSize: 16,
        color: "#66493D",
        paddingLeft: "6%",
        paddingRight: "5%",
        width: "85%",
        textAlign: "center"
    },
    styleConfirmationWindow: {
        marginTop: "10%",
        height: "25%",
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: "#59524C",
        width: "50%",
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 10,
    },
    cancelButton: {
        backgroundColor: "#D99982",
        width: "50%",
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
		fontFamily: "monospace", 
		fontSize: 16
    },
    habitTitleDeleteRequest:
    {
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 16
    },    
    habitTitleDeleteRequestWrapper: {
        borderRadius: 10,
        minHeight: "7%",
        padding: 10,
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    plusIcon: {
        width: 35,
        height: 35,
        marginTop: 2,
        marginRight: 12,
        opacity: 0.5
    },
    goIcon: {
        width: "100%",
        height: "100%",
        position: "absolute",
        right: -10,
        transform: [{ rotate: '45deg' }]
    },
    goIconWrapper: {
        width: "15%",
        height: "25%",
        position: "absolute",
        marginTop: 5,
        right: 0
    },
    cancelInput: {
        backgroundColor: "#D99982",
        width: "50%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 10
    },
    habitView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        paddingVertical: 10
    },
    checkboxView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "2%"
    },
    stageStyle: {
        position: "absolute",
        top: "15%",
        left: "2.5%",
        fontFamily: "serif"
    }
});

export default Home;