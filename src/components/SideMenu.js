import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import { showRequestConfirm } from "../actions/userActions";
import { View, Button, Icon, Text, ListItem, Left, Body, Right, Header, Title } from "native-base";
import { connect } from "react-redux";
import { LOGOUT, CLAIM_INQUIRY_GET_POLICY_LIST, CLAIM_HISTORY_GET_POLICY_LIST } from "../actions/actionTypes";

const { width, height } = Dimensions.get('window');

const listMenu = [];

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.user.token,
            loginType: null,
            listMenu: []
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            const { loginType } = nextProps.user;
            var listMenuTmp = [];
            switch(loginType) {
                case 'TPA':
                    listMenuTmp = [
                        { icon: 'home', name: 'Trang chủ' },
                        { icon: 'person', name: 'Thông tin cá nhân' },
                        { icon: 'paper', name: 'Lịch sử bồi thường' },
                        { icon: 'add-circle', name: 'DS Bệnh viện/Phòng khám' },
                        { icon: 'stats', name: 'Biểu đồ' },
                        { icon: 'key', name: 'Đổi mật khẩu' },
                        { icon: 'information-circle', name: 'Liên hệ' },
                        { icon: 'arrow-round-back', name: 'Đăng xuất' }
                    ];
                    break;
                case 'CERTIFICATE':
                    listMenuTmp = [
                        { icon: 'home', name: 'Trang chủ' },
                        // { icon: 'person', name: 'Thông tin cá nhân' },
                        // { icon: 'paper', name: 'Lịch sử bồi thường' },
                        // { icon: 'add-circle', name: 'DS Bệnh viện/Phòng khám' },
                        { icon: 'key', name: 'Đổi mật khẩu' },
                        { icon: 'information-circle', name: 'Liên hệ' },
                        { icon: 'arrow-round-back', name: 'Đăng xuất' }
                    ];
                    break;
                case 'POLICY':
                    listMenuTmp = [
                        { icon: 'home', name: 'Trang chủ' },
                        { icon: 'person', name: 'Thông tin cá nhân' },
                        { icon: 'paper', name: 'Lịch sử bồi thường' },
                        { icon: 'add-circle', name: 'DS Bệnh viện/Phòng khám' },
                        { icon: 'key', name: 'Đổi mật khẩu' },
                        { icon: 'information-circle', name: 'Liên hệ' },
                        { icon: 'arrow-round-back', name: 'Đăng xuất' }
                    ];
                    break;
                case 'BROKER':
                    listMenuTmp = [
                        { icon: 'home', name: 'Trang chủ' },
                        { icon: 'add-circle', name: 'DS Bệnh viện/Phòng khám' },
                        { icon: 'stats', name: 'Biểu đồ' },
                        { icon: 'key', name: 'Đổi mật khẩu' },
                        { icon: 'information-circle', name: 'Liên hệ' },
                        { icon: 'arrow-round-back', name: 'Đăng xuất' }
                    ];
                    break;
                case 'HOSPITAL':
                    listMenuTmp = [
                        { icon: 'home', name: 'Trang chủ' },
                        { icon: 'person', name: 'Thông tin cá nhân' },
                        { icon: 'add-circle', name: 'DS Bệnh viện/Phòng khám' },
                        { icon: 'key', name: 'Đổi mật khẩu' },
                        { icon: 'information-circle', name: 'Liên hệ' },
                        { icon: 'arrow-round-back', name: 'Đăng xuất' }
                    ];
                    break;
                default:
                    break;
            }
            this.setState({
                listMenu: listMenuTmp,
                loginType: loginType
            });
        }
    }
        

    logout() {
        showRequestConfirm('Thông báo', 'Bạn có chắc muốn đăng xuất ?', () => {
            this.props.onLogoutAction();
        });
    }

    onClickMenu(index) {
        this.props.navigation.navigate('DrawerClose');
        const { loginType } = this.state;
        switch(loginType) {
            case 'TPA':
                switch(index) {
                    case 0:
                        this.props.goToHomePage();
                        break;
                    case 1:
                        this.props.goToClaimInquiryPage(this.props.user.token);
                        break;
                    case 2:
                        this.props.goToClaimHistoryPage(this.props.user.token);
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        this.props.goToChangePasswordPage();
                        break;
                    case 6:
                        this.props.goToContactPage();
                        break;
                    case 7:
                        this.logout();
                        break;
                    default:
                        break;
                }
                break;
            // case 'CERTIFICATE':
            //     switch(index) {
            //         case 0:
            //             this.props.goToHomePage();
            //             break;
            //         case 1:
            //             this.props.goToClaimInquiryPage(this.props.user.token);
            //             break;
            //         case 2:
            //             this.props.goToClaimHistoryPage(this.props.user.token);
            //             break;
            //         case 3:
            //             break;
            //         case 4:
            //             this.props.goToChangePasswordPage();
            //             break;
            //         case 5:
            //             this.props.goToContactPage();
            //             break;
            //         case 6:
            //             this.logout();
            //             break;
            //         default:
            //             break;
            //     }
            //     break;
            case 'CERTIFICATE':
                switch(index) {
                    case 0:
                        this.props.goToHomePage();
                        break;
                    case 1:
                        this.props.goToChangePasswordPage();
                        break;
                    case 2:
                        this.props.goToContactPage();
                        break;
                    case 3:
                        this.logout();
                        break;
                    default:
                        break;
                }
                break;
            case 'POLICY':
                switch(index) {
                    case 0:
                        this.props.goToHomePage();
                        break;
                    case 1:
                        this.props.goToClaimInquiryPage(this.props.user.token);
                        break;
                    case 2:
                        this.props.goToClaimHistoryPage(this.props.user.token);
                        break;
                    case 3:
                        break;
                    case 4:
                        this.props.goToChangePasswordPage();
                        break;
                    case 5:
                        this.props.goToContactPage();
                        break;
                    case 6:
                        this.logout();
                        break;
                    default:
                        break;
                }
                break;
            case 'BROKER':
                switch(index) {
                    case 0:
                        this.props.goToHomePage();
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        this.props.goToChangePasswordPage();
                        break;
                    case 4:
                        this.props.goToContactPage();
                        break;
                    case 5:
                        this.logout();
                        break;
                    default:
                        break;
                }
                break;
            case 'HOSPITAL':
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
                        this.props.goToChangePasswordPage();
                        break;
                    case 4:
                        this.props.goToContactPage();
                        break;
                    case 5:
                        this.logout();
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
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
                            <Title>Danh mục</Title>
                        </Body>
                    </Header>
                    { this.state.listMenu.map((item, index) => this.renderListItemChild(item, index)) }
                </View>
            </View>
        );
    }

};

const mapStateToProps = (state) => {
    const { userReducers, claimInquiryReducers, claimHistoryReducers } = state;
    const user = userReducers;
    const claimInquiry = claimInquiryReducers;
    const claimHistory = claimHistoryReducers;
    return {
        user,
        claimInquiry,
        claimHistory
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutAction: () =>  dispatch({ type: LOGOUT }),
        goToHomePage: () => dispatch({ type: 'push', routeName: 'Home' }),
        goToClaimInquiryPage: (token) => dispatch({ type: CLAIM_INQUIRY_GET_POLICY_LIST, payload: token }),
        goToClaimHistoryPage: (token) => dispatch({ type: CLAIM_HISTORY_GET_POLICY_LIST, payload: token }),
        goToChangePasswordPage: () => dispatch({ type: 'push', routeName: 'ChangePassword' }),
        goToContactPage: () => dispatch({ type: 'push', routeName: 'Contact' }),
    }
}

const SideMenuContainer = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

export default SideMenuContainer;