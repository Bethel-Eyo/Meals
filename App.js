import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from 'react-native-splash-screen';
import Apikeys from './app/contants/Apikeys';
import * as firebase from 'firebase';
import Login from './app/auth/Login';
import SignUp from './app/auth/SignUp';
import ForgotPassword from './app/auth/ForgotPassword';
import Kyc from './app/pages/Kyc';
import Profile from './app/pages/Profile';

class AuthLoadingScreen extends React.Component {
  constructor(props){
    super(props);
    //this._bootstrapAsync();
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    }

    // initialize firebase
    if(!firebase.apps.length){
      firebase.initializeApp(Apikeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'TestLogin');
    })
  }


  // Render any loading content of your choice here
  render(){
    if((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    } else {
      this.props.navigation.navigate(this.state.isAuthenticated ? 'App' : 'TestLogin');
    }
  }
}

class LoginScreen extends React.Component {
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome Anonymous User</Text>
        <Button title="Sign In" onPress={this._signInAsync} />
      </View>
    );
  }
}

class App extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
  }
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render(){
    return (
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Header />
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Step One</Text>
                  <Text style={styles.sectionDescription}>
                    Edit <Text style={styles.highlight}>App.js</Text> to change this
                    screen and then come back to see your edits.
                  </Text>
                </View>
                <Button
                  onPress={() => this.props.navigation.openDrawer()}
                  title="Open Drawer"
                />
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>See Your Changes</Text>
                  <Text style={styles.sectionDescription}>
                    <ReloadInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Debug</Text>
                  <Text style={styles.sectionDescription}>
                    <DebugInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Learn More</Text>
                  <Text style={styles.sectionDescription}>
                    Read the docs to discover what to do next:
                  </Text>
                </View>
                <LearnMoreLinks />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Fragment>
      );
    }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
      drawerLabel: 'Settings'
  };

  componentDidMount(){
    const { currentUser } = firebase.auth().currentUser;
    this.setState({ currentUser });
  }

  _signOutAsync = async () => {
    // this.props.navigation.navigate('TestLogin');
    firebase.auth().signOut();
  };

  render() {
      return (
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.sets}>
                <Text style={styles.sectionTitle}>This is the Settings Screen</Text>
              <Button
                onPress={() => this.props.navigation.openDrawer()}
                title="Open Drawer"
              />
              <Button
                onPress={() => this.props.navigation.navigate("UserKycStack")}
                title="Update Your Kyc"
              />
              <Button
                onPress={this._signOutAsync}
                title="Sign Out"
              />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Fragment>
      );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sets: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: App,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Profile: {
    screen: Profile
  }
});

const AuthStack = createStackNavigator({
  SignIn: LoginScreen
});

const LogStack = createStackNavigator({
  TestLog: Login
});

const SignUpStack = createStackNavigator({
  TestSign: SignUp
});

const ForgotStack = createStackNavigator({
  ForgotPass: ForgotPassword
});

const KycStack = createStackNavigator({
  UserKyc: Kyc
});

const MyApp = createAppContainer(createSwitchNavigator(
  {
  Auth: AuthStack,
  App: MyDrawerNavigator,
  AuthLoading: AuthLoadingScreen,
  TestLogin: LogStack,
  TestSignUp: SignUpStack,
  TestForgotPass: ForgotStack,
  UserKycStack: KycStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
));

export default MyApp;
