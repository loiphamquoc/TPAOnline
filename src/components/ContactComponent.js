import React, { Component } from "react";
import { View, Platform, Dimensions, ScrollView } from "react-native";
import { Text, Header, Left, Button, Icon, Body, Title, Right } from "native-base";

const { width, height } = Dimensions.get('window');

export default class ContactComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.goToHomePage();
                        }} >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Liên hệ</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1, margin: 10, padding: 10 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ fontFamily: 'Helvetica', color: '#41464b', fontSize: 16, fontWeight: "500" }}>CÔNG TY TNHH DỊCH VỤ VÀ TƯ VẤN</Text>
                            <Text style={{ fontFamily: 'Helvetica', color: '#41464b', fontSize: 16, fontWeight: "500" }}>BẢO HIỂM ĐÔNG A</Text>
                        </View>
                        <Text></Text>
                        <Text style={{ fontFamily: 'Helvetica', color: '#64707b', fontSize: 13 }}>Được thành lập vào năm 2017; với sứ mệnh cung cấp các dịch vụ bảo hiểm TPA và các dịch vụ bảo hiểm chất lượng hàng đầu cho khách hàng.</Text>
                        <Text></Text>
                        <Text style={{ fontFamily: 'Helvetica', color: '#64707b', fontSize: 13 }}>Địa chỉ: 340 / 44A Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam</Text>
                        <Text style={{ fontFamily: 'Helvetica', color: '#64707b', fontSize: 13 }}>Điện thoại: 028 62710356</Text>
                        <Text style={{ fontFamily: 'Helvetica', color: '#64707b', fontSize: 13 }}>Hot line: 028 62710356</Text>
                        <Text style={{ fontFamily: 'Helvetica', color: '#64707b', fontSize: 13 }}>Email: tpa@baohiemdonga.com</Text>
                        <Text></Text>
                        <View
                            style={{ flex: 1 }}
                        >
                            <Button iconLeft full style={[ { margin: 5 }, this.props.style ]}>
                                <Icon name="logo-facebook" />
                                <Text style={[ { color: 'white' }, this.props.style ]} >Facebook</Text>
                            </Button>
                            <Button iconLeft full style={[ { margin: 5 }, this.props.style ]}>
                                <Icon name="logo-twitter" />
                                <Text style={[ { color: 'white' }, this.props.style ]} >Twitter</Text>
                            </Button>
                            <Button iconLeft full danger style={[ { margin: 5 }, this.props.style ]}>
                                <Icon name="logo-googleplus" />
                                <Text style={[ { color: 'white' }, this.props.style ]} >Google+</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}