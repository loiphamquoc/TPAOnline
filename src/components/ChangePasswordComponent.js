import React, { Component } from "react";
import { View, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Text, Header, Left, Button, Icon, Body, Title, Right, Card, CardItem, Item, Input } from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";
import { showRequestAlert } from "../actions/userActions";

const { width, height } = Dimensions.get('window');

export default class ClaimInquiryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPassword: '',
            newPassword: '',
            reNewPassword: ''
        };
    }

    changePassword() {
        const { curPassword, newPassword, reNewPassword } = this.state;
        if (!curPassword || !newPassword || !reNewPassword) {
            showRequestAlert('Thông báo', 'Vui lòng nhập đầy đủ thông tin', () => {});
            return;
        }
        if (curPassword === newPassword) {
            showRequestAlert('Thông báo', 'Mật khẩu mới phải khác mật khẩu hiện tại', () => {});
            return;
        }
        if (newPassword !== reNewPassword) {
            showRequestAlert('Thông báo', 'Xác nhận mật khẩu mới không trùng khớp với mật khẩu mới', () => {});
            return;
        }
        const token = this.props.user.token;
        this.props.onChangePassword({
            token: token,
            curPassword: curPassword,
            newPassword: newPassword,
            reNewPassword: reNewPassword
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.toggleDrawer();
                        }} >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Đổi mật khẩu</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1, margin: 10 }}>
                        <Item>
                            <Input
                                placeholder="Mậu khẩu hiện tại"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    this.setState({
                                        curPassword: value
                                    });
                                }}
                                value={this.state.curPassword}
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="Mật khẩu mới"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    this.setState({
                                        newPassword: value
                                    });
                                }}
                                value={this.state.newPassword}
                            />
                        </Item>
                        <Item>
                            <Input
                                placeholder="Xác nhận mật khẩu mới"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    this.setState({
                                        reNewPassword: value
                                    });
                                }}
                                value={this.state.reNewPassword}
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
                                onPress={() => this.changePassword()}
                            >
                                <Text
                                    style={{
                                        color: 'red',
                                        fontSize: 13,
                                        fontFamily: 'Helvetica',
                                }}>
                                    GỬI
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}