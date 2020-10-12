import React, { Component } from "react";
import Modal from "react-native-modalbox";
import {
    Dimensions,
    View, 
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import { handleNextStageQuery } from "../helpers/buttonHandlers/handleNextStageQuery";
import { refreshStageAfterProceed } from "../helpers/refreshStageAfterProceed";

export default class ModalBox extends Component 
{
    constructor(props)
    {
        super(props);
    }

    triggerModalOpening = () =>
    {
        this.refs.requestModal.open();
    }

    triggerModalClosing = () =>
    {
        this.refs.requestModal.close();
    }

    render () 
    {
        var {
            habitId,
            callRequest,
            refreshStageCallback
        } = this.props;
        return (
            <Modal
                    style={styles.modalWrapper}
                    deviceWidth={Dimensions.get("window").width}
                    deviceHeight={Dimensions.get("window").height}
                    backdrop={false}
                    ref={"requestModal"} 
                    isOpen={this.props.nextStageRequest}>
                    <View style={styles.wrapperRigthAfterModal}>
                        <View style={styles.containerView}>
                            <Text style={styles.completeMessage}>Wow! You completed the stage of your new habit ! 
                            Do you want to make the habit really <Text style={styles.toughWord}>tough</Text> to break ?</Text>
                                <View style={styles.opacityWrapper}>
                                    <TouchableOpacity
                                        style={[styles.opacities, styles.yesOpacity]}
                                        onPress={() => {
                                            refreshStageAfterProceed(habitId, refreshStageCallback);
                                            handleNextStageQuery(true, 
                                                                habitId, 
                                                                this.props.callbackProceedRequest, 
                                                                this.props.callbackProceedRequestDeclined, 
                                                                callRequest)
                                        }}
                                    >
                                            <Text style={styles.options}>YES</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.opacities, styles.noOpacity]}
                                        onPress={() => handleNextStageQuery(false,
                                                                            habitId, 
                                                                            this.props.callbackProceedRequest, 
                                                                            this.props.callbackProceedRequestDeclined, 
                                                                            callRequest)}
                                        >
                                        <Text style={styles.options}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                        </View>
                </Modal>
            );
    }
}

const styles = StyleSheet.create({
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
    wrapperRigthAfterModal: {
        marginTop: "5%",
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
    },
    gradient: {
        height: "12%"
    },
    modalWrapper: {
        backgroundColor: "rgba(0,0,0,0)"
    }
});