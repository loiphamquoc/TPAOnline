import React, { Component } from "react";
import { View, AsyncStorage, ActivityIndicator, StatusBar } from "react-native";
import { Text } from "native-base";

export default class InitialComponent extends Component {
    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }
    bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token ? 'App' : 'Auth');
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator />
                <StatusBar barDefault='default' />
            </View>
        );
    }
}