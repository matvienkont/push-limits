import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import PlusIcon from '../../icons/plus-circle-512.png';
import DeviceInfo from "react-native-device-info";

import { getArrayOfLists } from './helpers/habitList/getArrayOfLists';
import { resetNotification } from './helpers/habitList/resetNotification';

import { renderHabits } from "./sub-components/renderHabits/renderHabits";
import AddHabit from './sub-components/habitsAdding/AddHabit';
import { renderHabitOptionsWindow } from "./sub-components/habitsOptions/habitsOptions";
import EditWindow from "./sub-components/habitsOptions/editOption/editOption";
import { habitTextValidation } from './helpers/habitTextValidation/habitTextValidation';

class Home extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            habits: [],
            optionsRequest: false,
            optionsRequestHabit: {},
            inputWindow: false,
            inputCheckbox: false,
            toggleEditMode: false
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
            optionsRequest: true,
            optionsRequestHabit: element
        });
    }

    showInputWindow = () => 
    {
        return (
            <AddHabit 
                inputCheckbox={this.state.inputCheckbox}
                callbackSetStateCheckbox={this.callbackSetStateCheckbox.bind(this)}
                callbackSetStateCloseWindowInput={this.callbackSetStateCloseWindowInput.bind(this)}
                showValue={this.showValue.bind(this)}
                //textInputSubmit={habitTextValidation(this.callbackSetStateCloseWindowInput.bind(this))}
            />
        );
    }

    //input window
    callbackSetStateCheckbox = (value=!this.state.inputCheckbox) =>
    {
        return this.setState((state) => { return { inputCheckbox: value }})
    }
    
    callbackSetStateCloseWindowInput = () =>
    {
        return this.setState({ inputWindow: false })
    }

    callbackSetStateOnChangeText = (text) =>
    {
        return this.setState({ inputText: text});
    }

    //options menu
    callbackSetStateCloseOptionsMenu = () =>
    {
        return this.setState({optionsRequest: false});
    }

    callbackSetStateToggleEditMode = (value) =>
    {
        return this.setState({ toggleEditMode: value });
    } 

    componentDidMount()
    {
        this.showValue(); 
        this.props.navigation.setOptions({
            headerRight: () => (
                    <TouchableOpacity onPress={() => 
                                                { 
                                                    if(!this.state.optionsRequest) 
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

    render () 
    {
        //due to re-render while toggled edit menu it does not go inside second if condition
        if (Object.keys(this.state.optionsRequestHabit).length !== 0)
        {
            var habitId = this.state.optionsRequestHabit[0];
            var habitText = this.state.optionsRequestHabit[1].text;
        }
        if (this.state.optionsRequest)
        {
            var habitTitle = this.state.optionsRequestHabit[1].text;
        }

        return (
            <View>
                <ScrollView style={styles.scrollViewHome} contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="always">
                <View style={ styles.fullWidth }> 
                    { this.renderHabits() }
                </View>
				</ScrollView>

            { this.state.inputWindow && this.showInputWindow() }
            { this.state.optionsRequest && renderHabitOptionsWindow(habitTitle,
                                                                    habitId,
                                                                    this.callbackSetStateCloseOptionsMenu.bind(this), 
                                                                    this.showValue.bind(this), 
                                                                    this.callbackSetStateToggleEditMode.bind(this))}
            { this.state.toggleEditMode && <EditWindow
                                                habitId={habitId}
                                                habitText={habitText}
                                                callbackSetStateToggleEditMode={this.callbackSetStateToggleEditMode.bind(this)}
                                                showValue={this.showValue.bind(this)}
                                            />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullWidth: {
        width: "100%",
        marginTop: "3%"
    },   
    plusIcon: {
        width: 35,
        height: 35,
        marginTop: 2,
        marginRight: 12,
        opacity: 0.5
    }
});

export default Home;