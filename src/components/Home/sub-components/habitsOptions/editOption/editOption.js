import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";

import GoIcon from '../../../../../icons/go.png';
import CheckBox from '@react-native-community/checkbox';
import { confirmationWrapper } from "../../../styling/styles";

import { validateTitleChanges } from "./validateTitleChanges";

export default class EditWindow extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            inputCheckbox: false,
            inputText: ''
        }
    }

    toggleCheckBox = () => 
    {
        return this.setState((state) => { return { inputCheckbox: !state.inputCheckbox }});
    }

    inputChangeText = (text) =>
    {
        return this.setState({ inputText: text });
    }

    render () {
        var {
            callbackSetStateToggleEditMode,
            habitId,
            habitText,
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
                                defaultValue={habitText}
                                onSubmitEditing={(event) => validateTitleChanges(habitId, 
                                                            event.nativeEvent.text, 
                                                            this.state.inputCheckbox, 
                                                            callbackSetStateToggleEditMode,
                                                            showValue)}
                                onChangeText={(text)=> this.inputChangeText(text)}
                                placeholder="New name"
                                paddingRight={42}
                                >
                        
                    </TextInput>
                        <TouchableOpacity style={styles.goIconWrapper} onPress={() => validateTitleChanges(habitId, 
                                                                                                this.state.inputText, 
                                                                                                this.state.inputCheckbox, 
                                                                                                callbackSetStateToggleEditMode,
                                                                                                showValue)
                                                                                }>
                            <Image
                                    style={styles.goIcon}
                                    source={GoIcon}
                                />
                        </TouchableOpacity>
                        <View style={styles.checkboxView}>
                            <CheckBox
                                disabled={false}
                                value={this.state.inputCheckbox}
                                onValueChange={() => this.toggleCheckBox()}
                            />
                            <Text onPress=  {() => this.toggleCheckBox()}>
                                    Reset progress on missed day
                            </Text>
                        </View>
                    <TouchableOpacity style={styles.cancelInput} onPress={() => callbackSetStateToggleEditMode()}>
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