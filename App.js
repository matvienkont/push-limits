import React from "react";
import initialiseNotifications from "./src/helpers/notifications/initialiseNotifications";
import scheduleNotifications from "./src/helpers/notifications/scheduleNotifications";

import PushNotification from "react-native-push-notification";
import FlashMessage from "react-native-flash-message";

import Navigation from "./src/components/initAppNavigation/navigationInit";

initialiseNotifications();

class App extends React.Component 
{
	constructor(props) {
	
		super(props);
		 
		this.state = 
		{
            counter: 0,
		}
    }

	counter = 0;
	getCounter = (childCounter) => {
		this.counter = childCounter;
	}

	UNSAFE_componentWillMount () 
	{
		PushNotification.cancelAllLocalNotifications();
		scheduleNotifications();
	}

	render () {
		return (
			<>
				<Navigation getCounter={this.getCounter.bind(this)}/>
				<FlashMessage position="top" />	
			</>
		);
	}
  
};

export default App;
