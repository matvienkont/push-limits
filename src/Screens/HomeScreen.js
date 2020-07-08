import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

class HomeScreen extends Component {
	constructor(props)
	{
		super(props);
	}

    

  	render() {
		  	return (
    		<View style={styles.border}>
				  <Button
        title="Go to Habit"
        onPress={() => this.props.navigation.navigate('Habit')}
      />
      			<Text>Home</Text>
    		</View>
  		);
	}
}

const styles = StyleSheet.create({
	border: {
		flex:1,
		backgroundColor: "#D9CEC1",
	}
});

export default HomeScreen;