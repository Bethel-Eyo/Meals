import React from 'react';
import * as firebase from 'firebase';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    Alert,
} from 'react-native';

export default class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        };
    }

    onResetPassPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert('Password reset email has been sent.');
            }, (error) => {
                Alert.alert(error.message);
            })
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate("TestLogin");
    }

    render(){
        return (
            <View style={{paddingTop:50, alignItems: "center"}}>
                <Text>Forgot Password</Text>
                <TextInput style={{width:200, height:40, borderWidth: 1}}
                value={this.state.email}
                onChangeText={(text) => {this.setState({email: text}) }}
                placeholder="Enter email"
                autoCapitalize="none"
                autoCorrect={false}/>

                <Button title="Reset Password" onPress={this.onResetPassPress} />

                <Button title="Back to Login" onPress={this.onBackToLoginPress} />
            </View>
        )
    }
}

const styles = StyleSheet.create({});