import React from 'react';
import * as firebase from 'firebase';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    Alert,
} from 'react-native';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: ""
        };
    }

    onSignUpPress = () => {
        if(this.state.password !== this.state.passwordConfirm){
            Alert.alert('Passwords do not match');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {

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
                <Text>Create Account</Text>
                <TextInput style={{width:200, height:40, borderWidth: 1}}
                value={this.state.email}
                onChangeText={(text) => {this.setState({email: text}) }}
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}/>

                <View style={{paddingTop: 10}} />

                <TextInput style={{width:200, height:40, borderWidth: 1}}
                value={this.state.password}
                onChangeText={(text) => {this.setState({password: text}) }}
                placeholder="Enter Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}/>

                <View style={{paddingTop: 10}} />

                <TextInput style={{width:200, height:40, borderWidth: 1}}
                value={this.state.passwordConfirm}
                onChangeText={(text) => {this.setState({passwordConfirm: text}) }}
                placeholder="Confirm Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}/>

                <Button title="Create Account" onPress={this.onSignUpPress} />
                <Button title="Back to Login" onPress={this.onBackToLoginPress} />
            </View>
        )
    }
}

const styles = StyleSheet.create({});