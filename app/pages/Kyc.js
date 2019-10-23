import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Alert,
    Picker,
} from 'react-native';
import * as firebase from 'firebase';
import Apikeys from '../contants/Apikeys';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName:"",
            occupation: "",
            gender:"",
            currentUser: null,
            choosenIndex: 1 
        };

    }

    componentDidMount(){
        const { currentUser } = firebase.auth().currentUser;
        this.setState({ currentUser });
      }

    onBackPressed = () => {
        this.props.navigation.navigate('App');
    }

      onUpdatePressed = () => {
        let user = firebase.auth().currentUser;
        let currentUserId = user.uid;
        if(!user){
            Alert.alert('Unverified User');
        } else {
            let db = firebase.database();
            db.ref('users/'+currentUserId).set(
                {
                    name: this.state.firstName + ' ' + this.state.lastName,
                    gender: this.state.gender
                }
            ).then(() => {
                Alert.alert('Updated successfully');
            }).catch((error) => {
                Alert.alert(error.message);
            });
        }
      }

      onTestPicker = () => {
          Alert.alert(this.state.gender);
      }
    


    render(){
        return (
            <View style={{paddingTop:50, alignItems: "center"}}>
                <Text>fill in your Kyc</Text>
                <TextInput style={{width:200, height:40, borderWidth: 1}}
                    value={this.state.firstName}
                    onChangeText={(text) => {this.setState({firstName: text}) }}
                    placeholder="First Name"
                    autoCorrect={false}/>

                <View style={{paddingTop: 10}} />

                <TextInput style={{width:200, height:40, borderWidth: 1}}
                    value={this.state.lastName}
                    onChangeText={(text) => {this.setState({lastName: text}) }}
                    placeholder="last Name"
                    autoCorrect={false}/>

                <View style={{paddingTop: 10}} />
                <Text>Select Gender</Text>
                    <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.gender}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({gender: itemValue, choosenIndex: itemPosition})}  
                    >  
                    <Picker.Item label="Male" value="Male" />  
                    <Picker.Item label="Female" value="Female" />   
                </Picker> 
                <Button title="Update Kyc" onPress={this.onUpdatePressed} />
                <Button title="Bsck to settings" onPress={this.onBackPressed} />
                <Button title="Test Picker" onPress={this.onTestPicker} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerStyle:{  
        height: 100,  
        width: "50%",  
        color: '#344953',  
        justifyContent: 'center',  
    }  
});