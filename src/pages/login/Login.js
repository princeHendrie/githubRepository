import React, {Component} from 'react';
import {Text, Image, TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styles from '../../values/styles';
import FormLogin from './FormLogin';




const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        { children }
    </TouchableWithoutFeedback>
  );

export default class Login extends Component {


    render() {
        return (
            <DismissKeyboard>
                
                <View style={styles.container}>
            
                <KeyboardAwareScrollView>  
                        <View style={styles.logoContainer}>
                            <Image 
                            style={styles.logo}
                            source={require('../../images/github_logo.png')} />
                        </View>
                        <View style={styles.myForm}>    
                               <FormLogin />
                        </View>
                    </KeyboardAwareScrollView>
                    
                </View>
               
            </DismissKeyboard>
        );
    }
}