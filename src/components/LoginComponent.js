import React, { Component } from "react";
import { LOGIN } from "../actions/actionTypes";
import { View, StyleSheet, AsyncStorage, Platform, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Text, Container, Header, Content, Item, Form, Label, Input, Picker, Icon  } from "native-base";
import { connect } from 'react-redux'
import IndicatorDialog from "../common/IndicatorDialog";

const pickerValues = [
    {
        label: 'Employee',
        value: 'CERTIFICATE'
    },
    {
        label: 'Human Resources',
        value: 'HR_POLICY'
    },
    {
        label: 'Insurance',
        value: 'TPA'
    },
    {
        label: 'Broker',
        value: 'BROKER'
    },
    {
        label: 'Hospital',
        value: 'HOSPITAL'
    }
];

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'tpa',
            password: 'admin',
            loginType: 'TPA',
        };
    }
    
    onLogin() {
        const { username, password, loginType } = this.state;
        if (!username || !password) {
            alert('You must enter Username and Password');
            return;
        }
        this.props.onLoginAction({
            loginType: loginType,
            username: username,
            password: password
        });
    }

    render() {
        const { showGlobalIndicator } = this.props;
        return (
                <View style={styles.wrapper} >
                    {showGlobalIndicator ? <IndicatorDialog message={'Vui lòng chờ...'}/> : null}
                    <ImageBackground style={styles.container} source={require('../../assets/images/logoMain_new.jpg')}>
                        <View style={styles.formContainer}>
                            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    color: 'red'
                                }}>TPA</Text>
                                <Text style={{
                                    fontSize: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    color: 'rgb(8, 141, 185)'
                                }}>Online</Text>
                            </View>
                            <Item picker>
                                <Label>Login Role</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select your Login role"
                                    iosIcon={ <Icon name="ios-arrow-down-outline" /> }
                                    style={{ width: 220 }}
                                    placeholder={this.state.loginType}
                                    selectedValue={this.state.loginType}
                                    onValueChange={(value, index) => this.setState({ loginType: value })}
                                >
                                    { pickerValues.map((item, index) => {
                                        return <Picker.Item key={item.value} label={item.label} value={item.value} />
                                    })}
                                </Picker>
                            </Item>
                            <Item>
                                <Icon active name='contact' />
                                <Input
                                    placeholder="Username"
                                    autoCapitalize="none"
                                    onChangeText={(value) => {
                                        this.setState({
                                            username: value
                                        });
                                    }}
                                    value={this.state.username}
                                />
                            </Item>
                            <Item>
                                <Icon active name='key' />
                                <Input
                                    placeholder="Password"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={(value) => {
                                        this.setState({
                                            password: value
                                        });
                                    }}
                                    value={this.state.password}
                                />
                            </Item>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: 20
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        height: 40,
                                        backgroundColor: '#ffffff',
                                        borderWidth: 1,
                                        borderColor: 'red',
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                        marginLeft: 20,
                                        marginRight: 20,
                                        width: 300
                                    }}
                                    onPress={() => this.onLogin()}
                                >
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 13,
                                            fontFamily: 'Helvetica',
                                    }}>
                                        LOGIN
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: 'Helvetica',
                                        color: '#007bff',
                                        textDecorationLine: 'underline'
                                    }}>
                                        Forgot password?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: 'Helvetica',
                                        color: '#007bff',
                                        textDecorationLine: 'underline'
                                    }}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
        );
    }
}

var styles = StyleSheet.create({
    wrapper: {flex: 1},
    container: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        margin: 20,
        padding: 20,
    }
})