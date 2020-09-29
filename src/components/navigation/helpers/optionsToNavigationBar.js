import DeviceInfo from "react-native-device-info";

export const optionsToNavigationBar = {
        headerStyle: { 
            elevation: 0,
                backgroundColor: "#877F7D",
                height: DeviceInfo.hasNotch() ? 110 : 60 
            },
        headerTitleStyle: {
                paddingTop: DeviceInfo.hasNotch() ? 30 : 0 
            }
}