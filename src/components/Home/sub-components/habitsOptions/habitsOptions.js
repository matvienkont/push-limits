import React from "react";
import {
    View,
    Text,
    TouchableOpacity, StyleSheet
} from "react-native";
import { confirmationWrapper } from "../../styling/styles";

export const renderHabitOptionsWindow = (habitTitle, callbackSetStateCloseOptionsMenu, deleteHabit, callbackSetStateToggleEditMode) =>
{
    return (
        <View style={confirmationWrapper()} >
            <View style={styles.styleConfirmationWindow} >
                <View style={styles.habitTitleOptionsRequestWrapper} >
                    <Text style={ styles.habitTitleOptionsRequest }>{habitTitle}</Text>
                </View>    
                <TouchableOpacity style={[styles.deleteButton, styles.buttonOptions]} onPress={() => { 
                                                                                                        callbackSetStateCloseOptionsMenu();
                                                                                                        deleteHabit();
                                                                                                    }}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.editButton, styles.buttonOptions]} onPress={() => {
                                                                                                        callbackSetStateToggleEditMode(true);
                                                                                                        callbackSetStateCloseOptionsMenu();
                                                                                                    }
                                                                                                    }>   
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cancelButton, styles.buttonOptions]} onPress={() => callbackSetStateCloseOptionsMenu()}>
                    <Text style={styles.buttonText}>Keep it</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    styleConfirmationWindow: {
        marginTop: "10%",
        height: "25%",
        width: "90%",
        alignItems: "center",
        borderRadius: 10,
    },
    habitTitleOptionsRequestWrapper: {
        borderRadius: 10,
        minHeight: "7%",
        padding: 10,
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    habitTitleOptionsRequest:
    {
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 16
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
    buttonText: {
        color: "white",
        fontWeight: 'bold',
		fontFamily: "monospace", 
		fontSize: 16
    } 
});