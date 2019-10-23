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

export default class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            name: 'Annonym',
            gender: 'indifferent',
            email: ''
        }
    }


    componentDidMount(){
        const { currentUser } = firebase.auth().currentUser;
        this.setState({ currentUser });
        let userId = firebase.auth().currentUser.uid;
        let user_email = firebase.auth().currentUser.email;
        let db = firebase.database();
        db.ref('/users/' + userId).once('value').then((snapshot) => {
            let user_name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
            let user_gender = (snapshot.val() && snapshot.val().gender) || 'Not Specified';
            this.setState({ 
                name: user_name,
                gender: user_gender,
                email: user_email
            });
        }).catch((error) => {
            Alert.alert(error.message);
        });
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