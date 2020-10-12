import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image, StyleSheet
  } from 'react-native';
import GoIcon from '../../../../icons/go.png';
import CheckBox from '@react-native-community/checkbox';
import { confirmationWrapper } from "../../styling/styles";
import { habitTextValidation } from "../../helpers/habitTextValidation/habitTextValidation";
  

export default class AddHabit extends React.Component
{
    constructor(props)
    {
        super(props);
        state = {
            inputText: ''
        }
    }
    
    render ()
    {
        var {
            inputCheckbox,
            callbackSetStateCheckbox,
            callbackSetStateCloseWindowInput,
            showValue
        } = this.props;
        return (
            <View scrollEnabled={false} style={confirmationWrapper()}>
                <View scrollEnabled={false} style={styles.styleConfirmationWindow} >
                    <TextInput 
                                autoFocus
                                style={styles.habitInput}
                                returnKeyType='done'
                                maxLength={50}
                                onSubmitEditing={(event) => habitTextValidation(callbackSetStateCloseWindowInput, callbackSetStateCheckbox, showValue, event.nativeEvent.text, inputCheckbox) }
                                onChangeText={(text)=> this.setState({ inputText: text})}
                                placeholder="Enter habit"
                                paddingRight={42}
                                >
                        
                    </TextInput>
                        <TouchableOpacity style={styles.goIconWrapper} onPress={() => habitTextValidation(callbackSetStateCloseWindowInput, callbackSetStateCheckbox, showValue, this.state.inputText, inputCheckbox) }>
                            <Image
                                    style={styles.goIcon}
                                    source={GoIcon}
                                />
                        </TouchableOpacity>
                        <View style={styles.checkboxView}>
                            <CheckBox
                                disabled={false}
                                value={inputCheckbox}
                                onValueChange={() => callbackSetStateCheckbox()}
                            />
                            <Text onPress=  {() => callbackSetStateCheckbox()}>
                                    Reset progress on missed day
                            </Text>
                        </View>
                    <TouchableOpacity style={styles.cancelInput} onPress={() => callbackSetStateCloseWindowInput()}>
                            <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                    
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
    habitInput: {
        backgroundColor: "white",
        
        width: "90%",
        borderRadius: 10,
        height: "25%",
    },
    goIconWrapper: {
        width: "15%",
        height: "25%",
        position: "absolute",
        marginTop: 5,
        right: 0
    },
    goIcon: {
        width: "100%",
        height: "100%",
        position: "absolute",
        right: -10,
        transform: [{ rotate: '45deg' }]
    },
    checkboxView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "2%"
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
		fontFamily: "monospace", 
		fontSize: 16
    },
    cancelInput: {
        backgroundColor: "#D99982",
        width: "50%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 10
    }
});