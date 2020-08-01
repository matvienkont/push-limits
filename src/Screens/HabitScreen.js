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

	habitID=this.props.route.params.habitId;

  	render () {
	  	return (
				<View style={styles.border}>
					<Habit navigation={ this.props.navigation } habitId={this.habitID} getCounter={this.props.getCounter}/>
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