import React from 'react';


import {
  StyleSheet,
  View,
} from 'react-native';

import Habit from '../components/Habit/Habit';

class HabitScreen extends React.Component {

	habitID=this.props.route.params.habitId;
	habitTITLE=this.props.route.params.habitTitle;
	habitStage=this.props.route.params.habitStage;

  	render () {
	  	return (
				<View style={styles.border}>
					<Habit navigation={ this.props.navigation } habitId={this.habitID} habitTitle={this.habitTITLE} habitStage={this.habitStage} getCounter={this.props.getCounter}/>
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