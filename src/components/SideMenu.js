import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import { showRequestConfirm } from "../actions/userActions";
import { View, Button, Icon, Text, ListItem, Left, Body, Right, Header, Title } from "native-base";
import { connect } from "react-redux";
import { LOGOUT, GET_POLICY_LIST } from "../actions/actionTypes";

const { width, height } = Dimensions.get('window');

const listMenu = [
    {
        icon: 'home',
        name: 'Trang chủ'
    },
    {
        icon: 'search',
        name: 'Truy vấn quyền lợi'
    },
    {
        icon: 'paper',
        name: 'Lịch sử bồi thường'
    },
    {
        icon: 'stats',
        name: 'Biểu đồ'
    },
    {
        icon: 'information-circle',
        name: 'Liên hệ'
    },
    {
        icon: 'arrow-round-back',
        name: 'Đăng xuất'
    }
];

class SideMenu extends Component {

    logout() {
        showRequestConfirm('Thông báo', 'Bạn có chắc muốn đăng xuất ?', () => {
            this.props.onLogoutAction();
        });
    }

    onClickMenu(index) {
        this.props.navigation.navigate('DrawerClose');
        switch(index) {
            case 0:
                this.props.goToHomePage();
                break;
            case 1:
                this.props.goToClaimInquiryPage(this.props.user.token);
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                this.props.goToContactPage();
                break;
            case 5:
                this.logout();
                break;
            default:
                break;
        };
    }

    renderListItemChild(item, index) {
        return (
            <ListItem icon
                onPress={() => {
                    this.onClickMenu(index)
                }}
                key={ item.icon }
            >
                <Left>
                    <Icon name={ item.icon } />
                </Left>
                <Body>
                    <Text>{ item.name }</Text>
                </Body>
                <Right>
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header>
                        <Body>
                            <Title>Menu</Title>
                        </Body>
                    </Header>
                    { listMenu.map((item, index) => this.renderListItemChild(item, index))}
                </View>
            </View>
        );
    }

};

const mapStateToProps = (state) => {
    const { userReducers } = state;
    return {
        user: userReducers
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutAction: () =>  dispatch({ type: LOGOUT }),
        goToHomePage: () => dispatch({ type: 'push', routeName: 'Home' }),
        goToClaimInquiryPage: (token) => dispatch({ type: GET_POLICY_LIST, payload: token }),
        goToContactPage: () => dispatch({ type: 'push', routeName: 'Contact' }),
    }
}

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;