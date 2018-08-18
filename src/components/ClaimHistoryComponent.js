import React, { Component } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { Text, Header, Left, Button, Icon, Body, Title, Right, Card, CardItem } from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";
import { showRequestAlert } from "../actions/userActions";

const { width, height } = Dimensions.get('window');

export default class ClaimHistoryComponent extends Component {
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
            lsClaimHistory: []
        };
    }

    componentDidMount() {
        var lsPolicy = [];
        const lsInStorePolicy = this.props.claimHistory.lsPolicy;
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
        if (nextProps.claimHistory) {
            // Update lsCertificate
            var lsCertificate = [];
            const lsInStoreCertificate = nextProps.claimHistory.lsCertificate;
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
            const inStoreCertificateInfo = nextProps.claimHistory.certificateInfo;
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
            // Update lsClaimHistory
            var lsClaimHistory = [];
            const lsInStoreClaimHistory = nextProps.claimHistory.lsClaimHistory;
            if (lsInStoreClaimHistory) {
                lsInStoreClaimHistory.map((item, index) => {
                    lsClaimHistory.push({
                        benefitName: item.benefitNameV,
                        claimDate: item.claimdate,
                        claimNo: item.claimno,
                        claimStatus: item.claimstatus,
                        direct: item.direct,
                        incurredAmount: item.incurredamount,
                        paidAmount: item.paidamount,
                    });
                });
            }
            this.setState({
                lsClaimHistory: lsClaimHistory,
                showDetail: lsClaimHistory.length > 0
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
            const { lsClaimHistory, style } = this.state;
            return (
                <View style={{ flex: 50 }}>
                    <Text
                        style={[ {
                            fontFamily: 'Helvetica',
                            fontSize: 18,
                            fontWeight: "500",
                            margin: 10,
                        }, this.props.style ]}
                    >Bảng chi tiết</Text>
                        {
                            lsClaimHistory.map((item, index) => {
                                return <Card key={item.claimNo}>
                                    <CardItem cardBody>
                                        <Body style={[ {padding: 5, margin: 5}, style ]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ { fontFamily: 'Helvetica' }, this.props.style ]}>{ "Số đơn: " + item.claimNo }</Text>
                                            </View>
                                            { item.claimDate ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]} >{ "- Ngày nhận hồ sơ: " + item.claimDate }</Text></View> : null }
                                            { item.benefitName ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- Quyền lợi BH: " + item.benefitName }</Text></View> : null }
                                            { item.incurredAmount ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- Số tiền YC bồi thường: " + item.incurredAmount }</Text></View> : null }
                                            { item.paidAmount ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- Số tiền bồi thường: " + item.paidAmount }</Text></View> : null }
                                            { item.direct ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- Bảo lãnh viện phí: " + item.direct }</Text></View> : null }
                                            { item.claimStatus ? <View><Text style={[ { fontFamily: 'Helvetica', marginLeft: 5 }, this.props.style ]}>{ "- Tình trạng hồ sơ: " + item.claimStatus }</Text></View> : null }
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
                        <Title>Lịch sử</Title>
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
                                            fontFamily: 'Helvetica',
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
                                            fontFamily: 'Helvetica',
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