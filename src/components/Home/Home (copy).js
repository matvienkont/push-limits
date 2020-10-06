import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import PlusIcon from '../../icons/plus-circle-512.png';



import DeviceInfo from "react-native-device-info";


import { getArrayOfLists } from './helpers/habitList/getArrayOfLists';
import { confirmationWrapper } from "./styling/styles";
import { resetNotification } from './helpers/habitList/resetNotification';

import { renderHabits } from "./sub-components/renderHabits/renderHabits";
import AddHabit from './sub-components/habitsAdding/AddHabit';

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
                        <TouchableOpacity style={[styles.deleteButton, styles.buttonOptions]} onPress={() => this.deleteHabit() }>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.editButton, styles.buttonOptions]} onPress={() => this.setState({ deleteRequest: false })}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cancelButton, styles.buttonOptions]} onPress={() => this.setState({ deleteRequest: false })}>
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
                
        this.setState({ inputWindow: false })
    }

    showInputWindow = () => 
    {
        return (
            <AddHabit 
                inputCheckbox={this.state.inputCheckbox}
                callbackSetStateCheckbox={this.callbackSetStateCheckbox.bind(this)}
                callbackSetStateCloseWindowInput={this.callbackSetStateCloseWindowInput.bind(this)}
                textInputSubmit={this.textInputSubmit.bind(this)}
            />
        );
    }

    callbackSetStateCheckbox = () =>
    {
        return this.setState((state) => { return { inputCheckbox: !state.inputCheckbox }})
    }
    
    callbackSetStateCloseWindowInput = () =>
    {
        return this.setState({ inputWindow: false })
    }

    callbackSetStateOnChangeText = (text) =>
    {
        return this.setState({ inputText: text});
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
    styleConfirmationWindow: {
        marginTop: "10%",
        height: "25%",
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
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
    buttonOptions:
    {
        width: "50%",
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: "#59524C"
    },
    cancelButton: {
        backgroundColor: "#D99982"
    },
    editButton: {
        backgroundColor: "#6F8C86",
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
    stageStyle: {
        position: "absolute",
        top: "15%",
        left: "2.5%",
        fontFamily: "serif"
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
		fontFamily: "monospace", 
		fontSize: 16
    }
});

export default Home;