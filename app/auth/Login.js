import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import * as firebase from 'firebase';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate('App');
            }, (error) => {
                Alert.alert(error.message);
            });
    }
    onCreateAccountPress = () => {
        this.props.navigation.navigate("TestSignUp");
    }
    onForgotPassPress = () => {
        this.props.navigation.navigate("TestForgotPass");
    }

    onGotoAppPress = () => {
        if(firebase.auth().currentUser){
            this.props.navigation.navigate("Auth");
        } else {
            Alert.alert('You must log in first');
        }
        
    }

    render(){
        return (
            <View style={{paddingTop:50, alignItems: "center"}}>
                <Text>Login</Text>
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

                <Button title="Login" onPress={this.onLoginPress} />
                <Button title="Create Account" onPress={this.onCreateAccountPress} />
                <Button title="Forgot Password" onPress={this.onForgotPassPress} />

                <Button title="Go to App" onPress={this.onGotoAppPress} />
            </View>
        )
    }
}

const styles = StyleSheet.create({});