import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../values/styles';
import color from '../../values/colors';
import {connect} from 'react-redux';
import {usernameChanged, passwordChanged, loginUser} from '../../actions/AuthActions';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';


class FormLogin extends Component {

    logIn(){
        const { username,password } = this.props;
        this.props.loginUser({username,password});
    }

    onUsernameChange(text) {
        this.props.usernameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    renderError() {
        if(this.props.error) {
            return (
                    <View>
                        <Text style={styles.errorText}>
                            {this.props.error}
                        </Text>
                    </View>
            );
        }
    }

    render() {
        return (
               
                <View  style={styles.containerFormLogin}>

                    <Spinner
                            visible={this.props.loading}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                    />

                    <TextField
                        label="Username"
                        onChangeText={this.onUsernameChange.bind(this)}
                        value={this.props.username} 
                    />
                    
                    <PasswordInputText
                        onChangeText={this.onPasswordChange.bind(this)}
                        selectionColor={color.green}
                        value={this.props.password}
                    />


                    {this.renderError()}

                    <TouchableOpacity onPress={this.logIn.bind(this)} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View >
                
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { username, password, error, loading } = auth;

    return { username, password, error, loading };
};

export default connect(mapStateToProps, { usernameChanged, passwordChanged, loginUser }) (FormLogin);
