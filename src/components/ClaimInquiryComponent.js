import React, { Component } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { Text, Header, Left, Button, Icon, Body, Title, Right, Card, CardItem } from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";
import { showRequestAlert } from "../actions/userActions";

const { width, height } = Dimensions.get('window');

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
                        label: item.lastName
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
                certificateInfo = {
                    certificateNo: inStoreCertificateInfo.certificateId,
                    identityNo: inStoreCertificateInfo.idNo,
                    certificateName: inStoreCertificateInfo.lastName,
                    classCode: inStoreCertificateInfo.classcode,
                    effectiveDateFrom: inStoreCertificateInfo.effectivefromdate,
                    effectiveDateTo: inStoreCertificateInfo.effectivetodate
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
                        benefitName: item.benefitNameV,
                        maxaType: item.maxaType,
                        maxaValue: item.maxaValue,
                        avMaxaValue: item.availableAmount,
                        limitType: item.limitType,
                        limitValue: item.limitValue,
                        avLimitValue: item.availableLimit,
                        maxiType: item.maxiType,
                        maxiValue: item.maxiValue,
                        avMaxiValue: item.availableAmountMaxi,
                    });
                });
            }
            this.setState({
                lsBenefit: lsBenefit,
                showDetail: lsBenefit.length > 0
            });
        }
    }
    
    renderInfo() {
        if (this.state.showInfo) {
            const { certificateInfo } = this.state;
            return (
                <View style={{ flex: 20 }}>
                    <Text
                        style={[ {
                            fontFamily: 'Helvetica',
                            fontSize: 18,
                            fontWeight: "500",
                            margin: 10,
                        }, this.props.style ]}
                    >Thông tin nhân viên</Text>
                    <Card>
                        <CardItem cardBody>
                            <Body style={[ {padding: 5, margin: 5}, this.props.style ]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[ { fontFamily: 'Helvetica', fontWeight: "400" }, this.props.style ]}>Mã số nhân viên: </Text>
                                    <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ certificateInfo.certificateNo }</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[ { fontFamily: 'Helvetica', fontWeight: "400" }, this.props.style ]}>CMND: </Text>
                                    <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ certificateInfo.identityNo }</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[ { fontFamily: 'Helvetica', fontWeight: "400" }, this.props.style ]}>Họ tên nhân viên: </Text>
                                    <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ certificateInfo.certificateName }</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[ { fontFamily: 'Helvetica', fontWeight: "400" }, this.props.style ]}>Nhóm: </Text>
                                    <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ certificateInfo.classCode }</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[ { fontFamily: 'Helvetica', fontWeight: "400" }, this.props.style ]}>Hiệu lực từ: </Text>
                                    <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ certificateInfo.effectiveDateFrom }</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[ { fontFamily: 'Helvetica', fontWeight: "400" }, this.props.style ]}>Hiệu lực đến: </Text>
                                    <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ certificateInfo.effectiveDateTo }</Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            );
        } else {
            return null;
        }
    }

    renderDetail() {
        if (this.state.showDetail) {
            const { lsBenefit, style } = this.state;
            return (
                <View style={{ flex: 50 }}>
                    <Text
                        style={[ {
                            fontFamily: 'Helvetica',
                            fontSize: 18,
                            fontWeight: "500",
                            margin: 10,
                        }, this.props.style ]}
                    >Thông tin quyền lợi</Text>
                        {
                            lsBenefit.map((item, index) => {
                                return <Card key={item.benefitCode}>
                                    <CardItem cardBody>
                                        <Body style={[ {padding: 5, margin: 5}, style ]}>
                                            <View>
                                                <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ "Quyền lợi BH: " + item.benefitName }</Text>
                                            </View>
                                            { item.maxaType ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]} >{ "- " + item.maxaType }</Text></View> : null }
                                            { item.maxaValue ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 10 }, this.props.style ]}>{ "+ Tổng: " + item.maxaValue }</Text></View> : null }
                                            { item.avMaxaValue ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 10 }, this.props.style ]}>{ "+ Còn: " + item.avMaxaValue }</Text></View> : null }
                                            { item.limitType ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- " + item.limitType }</Text></View> : null }
                                            { item.limitValue ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 10 }, this.props.style ]}>{ "+ Tổng: " + item.limitValue }</Text></View> : null }
                                            { item.avLimitValue ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 10 }, this.props.style ]}>{ "+ Còn: " + item.avLimitValue }</Text></View> : null }
                                            { item.maxiType ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- " + item.maxiType }</Text></View> : null }
                                            { item.maxiValue ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 10 }, this.props.style ]}>{ "+ Tổng: " + item.maxiValue }</Text></View> : null }
                                            { item.avMaxiValue ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 10 }, this.props.style ]}>{ "+ Còn: " + item.avMaxiValue }</Text></View> : null }
                                        </Body>
                                    </CardItem>
                                </Card>
                            })
                        }
                </View>
            );
        } else {
            return null;
        }
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
                        <Title>Truy vấn</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1, margin: 10 }}>
                        <View style={{ flex: 10 }}>
                            <Button full transparent primary
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
                        <View style={{ flex: 10 }}>
                            <Button full transparent primary
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
                        <View style={{ flex: 10 }}>
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