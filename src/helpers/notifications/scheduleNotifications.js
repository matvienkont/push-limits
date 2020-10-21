import PushNotification from "react-native-push-notification";

export default scheduleNotifications = () => 
{
    var nextTimeNotification = 10000//Math.floor(36000000 + (14400000*((Math.random() * 2) - 1)));
    PushNotification.localNotificationSchedule({
        vibrate: true,
        vibration: 100,
        title: "Reminder",
        message: "Don't forget to check available activities",
        repeatType: "time",
        repeatTime: nextTimeNotification,
        date: new Date(Date.now() + nextTimeNotification)
      });
}