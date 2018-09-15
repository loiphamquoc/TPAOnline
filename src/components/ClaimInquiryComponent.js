import React, { Component } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { Text, Header, Left, Button, Icon, Body, Title, Right, Card, CardItem, Accordion, Container, Content, ListItem, List } from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";
import { showRequestAlert } from "../actions/userActions";

const { width, height } = Dimensions.get('window');

const dataArray = [
    { title: "First Element", content: "XXX" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

export default class ClaimInquiryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polCode: '',
            displayPolCode: '',
            visiblePol: false,
            certNo: '',
            displayCertNo: '',
            visibleCert: false,
            lsPolicy: [],
            lsCertificate: [],
            showInfo: false,
            certificateInfo: {},
            showDetail: false,
            lsBenefit: []
        };
    }

    componentDidMount() {
        var lsPolicy = [];
        const lsInStorePolicy = this.props.claimInquiry.lsPolicy;
        if (lsInStorePolicy) {
            lsInStorePolicy.map((item, index) => {
                lsPolicy.push({
                    key: item.code,
                    label: item.name
                });
            })
        }
        this.setState({
            lsPolicy: lsPolicy,
        });
    }

    selectPol(value) {
        const { lsPolicy } = this.state;
        var displayPolCode;
        lsPolicy.map((item, index) => {
            if (item.key === value) {
                displayPolCode = item.label;
                return;
            }
        })
        this.setState({
            polCode: value,
            displayPolCode: displayPolCode,
            visiblePol: false,
            certNo: '',
            displayCertNo: '',
            showInfo: false,
            showDetail: false
        })
        this.props.onSelectPolicy({
            token: this.props.user.token,
            policyCode: value
        });
    }

    selectCert(value) {
        const { lsCertificate } = this.state;
        var displayCertNo;
        lsCertificate.map((item, index) => {
            if (item.key === value) {
                displayCertNo = item.label;
                return;
            }
        })
        this.setState({
            certNo: value,
            displayCertNo: displayCertNo,
            visibleCert: false,
            showInfo: false,
            showDetail: false
        })
    }

    inquiryData() {
        const { polCode, certNo } = this.state;
        if (!polCode || !certNo) {
            showRequestAlert('Thông báo', 'Vui lòng chọn Hợp đồng và Nhân viên cần truy vấn!', () => {});
            return;
        }
        this.props.onInquiryCertInfo({
            token: this.props.user.token,
            policyCode: polCode,
            certificateNo: certNo
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.claimInquiry) {
            // Update lsCertificate
            var lsCertificate = [];
            const lsInStoreCertificate = nextProps.claimInquiry.lsCertificate;
            if (lsInStoreCertificate) {
                lsInStoreCertificate.map((item, index) => {
                    lsCertificate.push({
                        key: item.certificateId,
                        label: item.lastName + (item.firstName ? ' ' + item.firstName : ''),
                    });
                });
            }
            this.setState({
                lsCertificate: lsCertificate
            });
            // Update certificateInfo
            var certificateInfo = {};
            const inStoreCertificateInfo = nextProps.claimInquiry.certificateInfo;
            if (inStoreCertificateInfo) {
                var birthday = inStoreCertificateInfo.dob;
                var status = inStoreCertificateInfo.status;
                if (status) {
                    if (status.toUpperCase() === 'ACTIVE') {
                        status = 'Đang hoạt động';
                    } else if (status.toUpperCase() === 'TERMINATED') {
                        status = 'Chấm dứt hợp đồng';
                    } else if (status.toUpperCase() === 'INACTIVE') {
                        status = 'Không hoạt động';
                    }
                }
                certificateInfo = {
                    certificateNo: inStoreCertificateInfo.certificateId,
                    identityNo: inStoreCertificateInfo.idNo,
                    certificateName: inStoreCertificateInfo.lastName + (inStoreCertificateInfo.firstName ? ' ' + inStoreCertificateInfo.firstName : ''),
                    gender: inStoreCertificateInfo.gender,
                    birthday: birthday,
                    cardNo: inStoreCertificateInfo.cardNo,
                    status: status,
                    phone: inStoreCertificateInfo.phone,
                    email: inStoreCertificateInfo.email
                }
            }
            this.setState({
                certificateInfo: certificateInfo,
                showInfo: certificateInfo.certificateNo
            });
            // Update lsBenefit
            var lsBenefit = [];
            const lsInStoreBenefit = nextProps.claimInquiry.lsBenefit;
            if (lsInStoreBenefit) {
                lsInStoreBenefit.map((item, index) => {
                    lsBenefit.push({
                        benefitCode: item.benefitCode,
                        displayName: item.displayName,
                        maxaValue: item.maxaValue,
                        avMaxaValue: item.availableAmount,
                        limitValue: item.limitValue,
                        avLimitValue: item.availableLimit
                    });
                });
            }
            this.setState({
                lsBenefit: lsBenefit,
                showDetail: lsBenefit.length > 0
            });
        }
    }

    renderHeaderCertInfo(title, expanded) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    padding: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#191DFF",
                    height: 45,
                }}
            >
                <View
                    style={{
                        flex: 8,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontFamily: 'Helvetica', fontWeight: "300", color: 'white', paddingLeft: 45 }}>THÔNG TIN CÁ NHÂN</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {expanded ? <Icon style={{ color: "white" }} name="remove" /> : <Icon style={{ color: "black" }} name="add" />}
                </View>
            </View>
        );
    }
    renderContentCertInfo(item) {
        return (
            <View
                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#b6b6b6', padding: 5, height: 400 }}
            >
                <Container>
                    <Content>
                        <List>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"Entypo"} name="man" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Họ và tên:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.certificateName }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"MaterialCommunityIcons"} name="gender-male-female" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Giới tính:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.gender }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"MaterialIcons"} name="date-range" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Ngày sinh:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.birthday }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"EvilIcons"} name="credit-card" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Số CMT/Hộ chiếu:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.identityNo }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="card" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Số thẻ:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.cardNo }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"EvilIcons"} name="lock" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Trạng thái:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.status }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"Entypo"} name="mobile" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Số điện thoại:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.phone }</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon type={"EvilIcons"} name="envelope" />
                                </Left>
                                <Body>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "400" }}>Email:</Text>
                                </Body>
                                <Right>
                                    <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.email }</Text>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </View>
        );
    }

    renderInfo() {
        if (this.state.showInfo) {
            const { certificateInfo } = this.state;
            return (
                <View style={{ flex: 10, marginTop: 10, marginBottom: 10, }}>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}></View>
                    <Content>
                        <Accordion
                            dataArray={[certificateInfo]}
                            renderContent={this.renderContentCertInfo}
                            renderHeader={this.renderHeaderCertInfo}
                        />
                    </Content>
                </View>
            );
        }
        return null;
    }

    renderHeaderBenefit(item, expanded) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    padding: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    height: 45,
                    borderWidth: 1,
                    borderColor: '#b6b6b6'
                }}
            >
                <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "300", color: 'black' }}>{ item.displayName }</Text>
                {expanded ? <Icon style={{ color: "red" }} name="remove" /> : <Icon style={{ color: "green" }} name="add" />}
            </View>
        );
    }
    renderContentBenefit(item) {
        var displayLimit = false;
        var limitValue = item.limitValue;
        var avLimitValue = item.avLimitValue;
        if (limitValue && avLimitValue) {
            displayLimit = true;
        }
        return (
            <View
                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#b6b6b6', padding: 5 }}
            >
                <View
                    style={{ flexDirection: 'row' }}
                >
                    <View
                        style={{ flex: 4, alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "500" }}>Quyền lợi tối đa</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>{item.maxaValue ? (item.maxaValue / 1000000) : 0}</Text>
                    </View>
                    <View
                        style={{ flex: 4, alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "500" }}>Quyền lợi còn lại</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>{item.avMaxaValue ? (item.avMaxaValue / 1000000) : 0}</Text>
                    </View>
                    <View
                        style={{ flex: 2, alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "500" }}>Đơn vị</Text>
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>Triệu/năm</Text>
                    </View>
                </View>
                { displayLimit ?
                    (<View
                        style={{ flexDirection: 'row' }}
                    >
                        <View
                            style={{ flex: 4, alignContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>{ item.limitValue }</Text>
                        </View>
                        <View
                            style={{ flex: 4, alignContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>{ item.avLimitValue }</Text>
                        </View>
                        <View
                            style={{ flex: 2, alignContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>Ngày/năm</Text>
                        </View>
                    </View>) : null }
            </View>
        );
    }

    renderBenefitLimit(item) {
        var limitType = item.limitType;
        var limitValue = item.limitValue;
        if (limitType && limitValue) {
            return (
                <View
                    style={{ flexDirection: 'row' }}
                    disabled={!isDisplayLimit}
                >
                    <View
                        style={{ flex: 4, alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>{ item.limitValue }</Text>
                    </View>
                    <View
                        style={{ flex: 4, alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>{ item.avLimitValue }</Text>
                    </View>
                    <View
                        style={{ flex: 2, alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'center' }}>Ngày/năm</Text>
                    </View>
                </View>
            );
        }
        return null;
    }

    renderDetail() {
        if (this.state.showDetail) {
            const { lsBenefit, style } = this.state;
            return (
                <View style={{ flex: 50, marginTop: 10, marginBottom: 10, }}>
                    <Content>
                        <View
                            style={{
                                height: 45,
                                backgroundColor: '#191DFF',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ fontFamily: 'Helvetica', fontWeight: "300", color: 'white' }}>THÔNG TIN QUYỀN LỢI</Text>
                        </View>
                        <Accordion
                            dataArray={lsBenefit}
                            renderContent={this.renderContentBenefit}
                            renderHeader={this.renderHeaderBenefit}
                        />
                    </Content>
                </View>
            );
        }
        return null;
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
                        <Title>Thông tin</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1, margin: 10 }}>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full transparent bordered primary
                                onPress={() => this.setState({ visiblePol: true })}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 11,
                                            fontFamily: 'Helvetica'
                                        },
                                        this.props.style
                                    ]}
                                >{ this.state.displayPolCode ? this.state.displayPolCode : "Chọn Hợp Đồng" }</Text>
                            </Button>
                            <ModalFilterPicker
                                visible={this.state.visiblePol}
                                onSelect={(value) => {
                                    this.selectPol(value);
                                }}
                                onCancel={() => this.setState({ visiblePol: false })}
                                options={ this.state.lsPolicy }
                                placeholderText="Chọn hợp đồng"
                                noResultsText="Không có kết quả"
                            />
                        </View>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full transparent bordered primary
                                onPress={() => this.setState({ visibleCert: true })}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 11,
                                            fontFamily: 'Helvetica'
                                        },
                                        this.props.style
                                    ]}
                                >{ this.state.displayCertNo ? this.state.displayCertNo : "Chọn Nhân Viên" }</Text>
                            </Button>
                            <ModalFilterPicker
                                visible={this.state.visibleCert}
                                onSelect={(value) => {
                                    this.selectCert(value);
                                }}
                                onCancel={() => this.setState({ visibleCert: false })}
                                options={ this.state.lsCertificate }
                                placeholderText="Chọn nhân viên"
                                noResultsText="Không có kết quả"
                            />
                        </View>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full danger
                                onPress={() => this.inquiryData()}
                            >
                                <Text style={[
                                    {
                                        color: 'white',
                                        fontFamily: 'Helvetica',
                                    },
                                    this.props.style
                                    ]}>Truy vấn</Text>
                            </Button>
                        </View>
                        { this.renderInfo() }
                        { this.renderDetail() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}