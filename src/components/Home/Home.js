import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';



import CheckBox from '@react-native-community/checkbox';

import PlusIcon from '../../icons/plus-circle-512.png';
import GoIcon from '../../icons/go.png';


import DeviceInfo from "react-native-device-info";


import { getArrayOfLists } from './helpers/habitList/getArrayOfLists';
import { confirmationWrapper } from "./styling/styles";
import { resetNotification } from './helpers/habitList/resetNotification';

import { renderHabits } from "./sub-components/renderHabits/renderHabits";



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
            var getList = getArrayOfLists();

            var data = (await getList).data;
            var resetCounter = (await getList).resetCounter;

            this.setState({ habits: data }, () => resetNotification(resetCounter));
        } catch (e)
        {
            console.log(e);
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
                <View style={confirmationWrapper()} >
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
            <View scrollEnabled={false} style={confirmationWrapper()}>
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

    

    renderHabits = () => 
    {
        if(this.state.habits.length > 0) 
        {
            return renderHabits(this.state.habits, this.toHabitScreen.bind(this), this.callConfirmationWindow.bind(this));
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
            progress: 19,
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