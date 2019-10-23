import React, {Fragment} from 'react';
import * as firebase from 'firebase';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    StatusBar,
    ScrollView,
    Button,
    Alert,
} from 'react-native';

export default class Posts extends React.Component {
    constructor(){
        super();
        this.state = {
            
        }
    }


    componentDidMount(){
        const { currentUser } = firebase.auth().currentUser;
        this.setState({ currentUser });
      }


    render(){
        return (
            <View style={{paddingTop:50, alignItems: "center"}}>
            <Text>Profile Information</Text>
            <View style={{paddingTop: 10}} />
            <Text style={styles.sectionTitle}>{this.state.name}</Text>
            <View style={{paddingTop: 10}} />
            <Text style={styles.sectionTitle}>{this.state.gender}</Text>
            <View style={{paddingTop: 10}} />
            <Text>{this.state.email}</Text>

            <Button
            onPress={() => this.props.navigation.openDrawer()}
            title="Open Drawer"
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '400',
      },
});