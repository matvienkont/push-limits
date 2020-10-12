import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  ScrollView
} from 'react-native';
import Home from "../components/Home/Home";

class HomeScreen extends React.Component {

	willFocus = this.props.navigation.addListener(
		'willFocus',
		payload => {
		this.forceUpdate();
		}
  	);

  	render() {
		  	return (
				
    		<View style={styles.border}>
					<Home navigation={ this.props.navigation } onGoingBack={this.re_renderOnGoingBack} />
    		</View>
  		);
	}
}

const styles = StyleSheet.create({
	border: {
		flex: 1,
		backgroundColor: "#D9CEC1",
	},
	scrollViewHome: {
		backgroundColor: "white",
		flex:1
	}
});

export default HomeScreen;