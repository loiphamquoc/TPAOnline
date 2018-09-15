import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, AsyncStorage } from "react-native";
import { Text, Item, Label, Input, Picker, Icon  } from "native-base";
import IndicatorDialog from "../common/IndicatorDialog";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'loiphamquoc@gmail.com',
            password: '123456',
            loginType: 'CERTIFICATE',
            language: this.props.user.language,
            listRole: [
                {
                    label: 'Nhân viên',
                    value: 'CERTIFICATE'
                },
                // {
                //     label: 'Nhân sự',
                //     value: 'HR_POLICY'
                // },
                // {
                //     label: 'Nhà bảo hiểm',
                //     value: 'TPA'
                // },
                // {
                //     label: 'Môi giới bảo hiểm',
                //     value: 'BROKER'
                // },
                // {
                //     label: 'Bệnh viện',
                //     value: 'HOSPITAL'
                // }
            ]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
        }
    }

    componentDidMount() {
    }
    
    onLogin() {
        const { username, password, loginType } = this.state;
        if (!username || !password) {
            var error = 'Vui lòng nhập Tài khoản và mật khẩu!';
            alert(error);
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
                                <Label>Vai trò</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Chọn vai trò"
                                    iosIcon={ <Icon name="ios-arrow-down-outline" /> }
                                    style={{ width: 220 }}
                                    placeholder={this.state.loginType}
                                    selectedValue={this.state.loginType}
                                    onValueChange={(value, index) => this.setState({ loginType: value })}
                                    headerBackButtonText={"Trở về"}
                                >
                                    { this.state.listRole.map((item, index) => {
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
                                        ĐĂNG NHẬP
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
                                        Quên mật khẩu?
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 13,
                                        fontFamily: 'Helvetica',
                                        color: '#007bff',
                                        textDecorationLine: 'underline'
                                    }}>
                                        Đăng ký
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