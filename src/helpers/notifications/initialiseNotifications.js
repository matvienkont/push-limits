import PushNotification from "react-native-push-notification";
import Platform from 'react-native';

export default initialiseNotifications = () => 
{
    PushNotification.configure({
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
      
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);		  
          notification.finish();
        },
      
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      
        popInitialNotification: true,
        requestPermissions: Platform.OS === "ios",
    });
}