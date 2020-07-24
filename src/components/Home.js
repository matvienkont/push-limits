import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';


class Home extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            habits: [],
            deleteRequest: false,
            deleteRequestHabit: ''
        };
    }

    unsubscribe = this.props.navigation.addListener('focus', () => {
        this.showValue();
    });

    showValue = async () => 
    {
        try {
            var temp = await AsyncStorage.getAllKeys()
            var data = await AsyncStorage.multiGet(temp);
            
            
            data.forEach(element =>
                element[1] = JSON.parse(element[1]))
            
            data.sort((a,b) => b[1].date - a[1].date)

            this.setState({ habits: data });
                    
            //await AsyncStorage.multiRemove(temp)
            //console.log(data);
            
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
            height: Dimensions.get("window").height,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
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

        const { navigation } = this.props;
        navigation.navigate("Habit", { habitId });
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
                            <Text style={styles.buttonText}>Let it go</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => this.setState({ deleteRequest: false })}>
                            <Text style={styles.buttonText}>Let it be</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    componentDidMount()
    {
        this.showValue();
    }

    renderHabits = () => 
    {
        if(this.state.habits.length > 0) 
        {
            var suffix = -1; 
            return this.state.habits.map( (element, index) => {
                        suffix += 1;
                        var habitTitle = element[1].text;
                        var progressInPercent = Math.ceil(element[1].progress/21 * 100);
                            return (
                                <TouchableOpacity   style={ styles.habitTouchableOp } 
                                                    key={"touchable"+suffix} 
                                                    onPress = {() => this.toHabitScreen(element)} 
                                                    onLongPress={() => this.callConfirmationWindow(element)} >
                                    <View key={"view"+suffix} style={styles.habitView}>
                                        <Text key={"text"+suffix} style={styles.habitText}>
                                            { habitTitle } { progressInPercent }%
                                        </Text>
                                    </View>
                                </TouchableOpacity> 
                            ) 
                        })                 
        }
    }

    setItemtoAsyncStorage = async (text) => 
    {
        const value = {
            text: text,
            progress: 0,
            date: Date.now(),
            last_button_press: ''   
        }

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
                <View style={ styles.fullWidth }> 
                    
                    { this.renderHabits() }
                        <TextInput 
                            style={styles.habitInput}
                            returnKeyType='done'
                            onSubmitEditing={(event) => { this.setItemtoAsyncStorage(event.nativeEvent.text); this.textInput.clear() }}
                            placeholder="Enter habit"
                            ref={input => { this.textInput = input }} />
                </View>
            { this.returnConfirmationWindow() }
            </View>
        );
    }
}



const styles = StyleSheet.create({
    habitInput: {
        backgroundColor: "white",
        marginBottom: 20
    },
    habitTouchableOp: {
        backgroundColor: "#E0D5C8",
        height: 50,
        alignItems: "center",
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
        color: "#66493D"
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
        color: "white"
    },
    habitTitleDeleteRequest: {
    },
    habitTitleDeleteRequestWrapper: {
        borderRadius: 10,
        height: "25%",
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Home;