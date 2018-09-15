import React, { Component } from "react";
import { View, Platform, Image, Text, ScrollView, TouchableHighlight, Dimensions, Linking, AsyncStorage, WebView, TouchableOpacity } from "react-native";
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
                        style={{ flex: 8 }}
                    >
                        <View
                            style={{ flex: 5, flexDirection: 'row' }}
                        >
                            <TouchableOpacity
                                style={{ flex: 5, borderColor: 'gray', borderWidth: 1, borderBottomWidth: 0, height: 140 }}
                                onPress={() => {
                                    this.props.goToClaimInquiryPage(this.props.user.token);
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}
                                >
                                    <Icon name="person" />
                                    <Text
                                        style={{ fontFamily: 'Helvetica' }}
                                    >
                                        Thông tin cá nhân
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 5, borderColor: 'gray', borderWidth: 1, borderBottomWidth: 0, height: 140 }}
                                onPress={() => {
                                    this.props.goToClaimHistoryPage(this.props.user.token);
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}
                                >
                                    <Icon name="paper" />
                                    <Text
                                        style={{ fontFamily: 'Helvetica' }}
                                    >
                                        Lịch sử bồi thường
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{ flex: 5, flexDirection: 'row' }}
                        >
                            <TouchableOpacity
                                style={{ flex: 5, borderColor: 'gray', borderWidth: 1, height: 140 }}
                                onPress={() => {
                                    this.props.goToHospitalPage({token : this.props.user.token});
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}
                                >
                                    <Icon name="medkit" />
                                    <Text
                                        style={{ fontFamily: 'Helvetica' }}
                                    >
                                        DS Bệnh viện/Phòng khám
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 5, borderColor: 'gray', borderWidth: 1, height: 140 }}
                                onPress={() => {
                                    this.props.goToContactPage();
                                }}
                            >
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}
                                >
                                    <Icon name="information-circle" />
                                    <Text
                                        style={{ fontFamily: 'Helvetica' }}
                                    >
                                        Liên hệ
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
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