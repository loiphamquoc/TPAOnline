import { Dimensions } from "react-native";
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { connect } from "react-redux";
import HomeContainer from "../containers/HomeContainer";
import LoginContainer from "../containers/LoginContainer";
import InitialComponent from "./InitialComponent";
import SideMenuContainer from "./SideMenu";
import ContactContainer from "../containers/ContactContainer";
import HospitalContainer from "../containers/HospitalContainer";
import ClaimInquiryContainer from "../containers/ClaimInquiryContainer";
import ClaimHistoryContainer from "../containers/ClaimHistoryContainer";
import ChangePasswordContainer from "../containers/ChangePasswordContainer";

const { width, height } = Dimensions.get('window');

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

export const MainStack = createStackNavigator({
    Home: {
        screen: HomeContainer,
        headerMode: 'none'
    },
    ClaimInquiry: {
        screen: ClaimInquiryContainer,
    },
    ClaimHistory: {
        screen: ClaimHistoryContainer,
    },
    Hospital: {
        screen: HospitalContainer,
    },
    Contact: {
        screen: ContactContainer,
    },
    ChangePassword: {
        screen: ChangePasswordContainer,
    },
}, {
    headerMode: 'none',
    cardStyle: { backgroundColor: '#FFFFFF' },
});

export const AuthDrawer = createDrawerNavigator({
    MainStack: MainStack
}, {
    drawerPosition: 'left',
    contentComponent: SideMenuContainer,
    drawerWidth: (width * 8) / 10
});

const AuthStack = createStackNavigator({
    Login: LoginContainer
}, {
    headerMode: 'none'
});

const RootNavigator = createSwitchNavigator({
    InitialComponent: InitialComponent,
    App: AuthDrawer,
    Auth: AuthStack
}, {
    headerMode: 'none',
    initialRouteName: 'InitialComponent'
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };