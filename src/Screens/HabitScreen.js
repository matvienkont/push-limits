import React, {Component} from 'react';


import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import Habit from '../components/Habit';

class HabitScreen extends Component {
	constructor(props)
	{
		super(props);
	}

  	render () {
	  	return (
				<View style={styles.border}>
						<Button
						title="Go to Home"
						onPress={() => this.props.navigation.navigate('Home')}/>
					<Habit wait={200} getCounter={this.props.getCounter}/>
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

export default HabitScreen;