import React, { Component } from "react";
import { View, Platform, Image, Text, ScrollView, TouchableHighlight, Dimensions, Linking, AsyncStorage, WebView } from "react-native";
import { Button, Container, Header, Content, Form, Label, Input, Icon, Left, Right, Body, Title, DeckSwiper, Card, CardItem, FooterTab, Footer } from "native-base";

const homePageDocuments = [
    {
        id: "1",
        title: "Hướng dẫn sử dụng",
        subtitle: "Chi tiết về cách sử dụng hệ thống, tra cứu thông tin",
        imageSrc: require('../../assets/images/userGuide.jpg')
    },
    {
        id: "2",
        title: "Mẫu biểu thanh toán",
        subtitle: "Mẫu biểu thanh toán",
        imageSrc: require('../../assets/images/submitForm.jpg')
    },
    {
        id: "3",
        title: "Thủ tục yêu cầu",
        subtitle: "Những thủ tục yêu cầu bảo hiểm",
        imageSrc: require('../../assets/images/requestForm.jpg')
    },
    {
        id: "4",
        title: "Danh sách bệnh viện",
        subtitle: "Tổng hợp danh sách bệnh viện nội, ngoại trú",
        imageSrc: require('../../assets/images/hospital.jpg')
    }
]

const { width, height } = Dimensions.get('window');

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }

    bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.onGetUserProfile(token);
    }

    onClickItem(index) {
        switch(index) {
            case "1":
                this.downloadFile('USER_GUIDE');
                break;
            case "2":
                this.downloadFile('CLAIM_FORM');
                break;
            case "3":
                this.downloadFile('CLAIM_PROCEDURE');
                break;
            case "4":
                this.downloadFile('HOSPITALS');
                break;
            default:
                break;
        }
    }

    downloadFile(tpcode) {
        var fetchUrl = `${baseUrl}/common/`;
        switch(tpcode) {
            case "USER_GUIDE":
                fetchUrl = fetchUrl + "userGuide";
                break;
            case "CLAIM_FORM":
                fetchUrl = fetchUrl + "claimForm";
                break;
            case "CLAIM_PROCEDURE":
                fetchUrl = fetchUrl + "claimProcedure";
                break;
            case "HOSPITALS":
                fetchUrl = fetchUrl + "hospitalList";
                break;
            default:
                break;
        }

        // fetch(fetchUrl, {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': this.props.user.token
        //     }
        // }).then(response => {
        //     return <WebView source={{ uri: fetchUrl, headers :{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': this.props.user.token
        //     }}} />
        // }).catch(err => {
        //     console.log(err)
        // });
        // Linking.openURL(fetchUrl).catch(err => console.error('An error occurred', err));

        <WebView source={{ uri: fetchUrl, headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.props.user.token
        }}} />
    }

    renderSlideItem(item) {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.onClickItem(item.id)
                }}
            >
                <Card
                    style={{ flex: 0 }}
                    key={ item.id }
                >
                    <CardItem>
                        <Body>
                            <Image style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                width: null,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            source={item.imageSrc} />
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Text
                            style={{
                                marginLeft: 15,
                                alignSelf: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            { item.title }
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Text>{ item.subtitle }</Text>
                    </CardItem>
                </Card>
            </TouchableHighlight>
        );
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
                        <Title>Trang Chủ</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        height: 30
                    }}
                >
                    <Text style={{ fontFamily: 'Helvetica', color: '#666' }}>CỔNG THÔNG TIN BẢO HIỂM TRỰC TUYẾN</Text>
                </View>
                <ScrollView>
                    <View
                        style={{ flex: 1, margin: 10 }}
                    >
                        <Image
                            style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: undefined,
                                height: 70
                            }}
                            source={require('../../assets/images/logo_tpa.png')}
                        />
                    </View>
                    <View
                        style={{ flex: 8, margin: 10 }}
                    >
                        <DeckSwiper
                            dataSource={homePageDocuments}
                            renderItem={item => this.renderSlideItem(item)}
                        >
                        </DeckSwiper>
                    </View>
                    {/* <WebView
                        style={{ flex: 10 }}
                        source={{ uri: 'http://localhost:8080/api-app/api/common/userGuide', headers :{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': this.props.user.token
                        }}}
                    /> */}
                </ScrollView>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        height: 30
                    }}
                >
                    <Text style={{ fontFamily: 'Helvetica', color: '#bbb' }}>Bản quyền © 2018 thuộc về TPA Team.</Text>
                </View>
            </View>
        );
    }
}