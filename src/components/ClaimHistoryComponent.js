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
            noRecordFound: false,
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
                        label: item.cardNo + "-" + item.lastName + (item.firstName ? ' ' + item.firstName : ''),
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
                    certificateName: inStoreCertificateInfo.lastName + (inStoreCertificateInfo.firstName ? ' ' + inStoreCertificateInfo.firstName : ''),
                    classCode: inStoreCertificateInfo.classcode,
                    cardNo: inStoreCertificateInfo.cardNo,
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
                    var claimDate = item.claimdate;
                    if (claimDate) {
                        var tmpClaimDate = new Date(claimDate);
                        if (tmpClaimDate) {
                            var day = tmpClaimDate.getDate();
                            if (day < 10) {
                                day = '0' + day;
                            }
                            var month = (tmpClaimDate.getMonth() + 1);
                            if (month < 10) {
                                month = '0' + month;
                            }
                            var year = tmpClaimDate.getFullYear();
                            claimDate = day + '/' + month + '/' + year;
                        }
                    }
                    var direct = 'Không';
                    if (item.direct && item.direct.toUpperCase() === 'YES') {
                        direct = 'Có';
                    }
                    var incurredAmount = item.incurredamount;
                    if (incurredAmount) {
                        incurredAmount = incurredAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }
                    var paidAmount = item.paidamount;
                    if (paidAmount) {
                        paidAmount = paidAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }
                    lsClaimHistory.push({
                        benefitName: item.benefitNameV,
                        claimDate: claimDate,
                        claimNo: item.claimno,
                        claimStatus: item.claimstatus,
                        direct: direct,
                        incurredAmount: incurredAmount,
                        paidAmount: paidAmount,
                    });
                });
            }
            this.setState({
                lsClaimHistory: lsClaimHistory,
                showDetail: lsClaimHistory.length > 0,
                noRecordFound: lsClaimHistory
            });
        }
    }

    renderInfo() {
        if (this.state.showInfo) {
            const { certificateInfo } = this.state;
            return (
                <View style={{ flex: 20 }}>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}></View>
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
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Mã số:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.certificateNo }</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>CMND:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.identityNo }</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Họ tên:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.certificateName }</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Nhóm:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.classCode }</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Số thẻ:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.cardNo }</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Hiệu lực từ:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.effectiveDateFrom }</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Hiệu lực đến:</Text>
                                    </View>
                                    <View style={{ flex: 7, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text style={[ { fontFamily: 'Helvetica', textAlign: 'right' }, this.props.style ]}>{ certificateInfo.effectiveDateTo }</Text>
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 20 }}>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }}></View>
                    <Text
                        style={[ {
                            fontFamily: 'Helvetica',
                            fontSize: 18,
                            fontWeight: "500",
                            margin: 10,
                        }, this.props.style ]}
                    >Không tìm thấy kết quả phù hợp</Text>
                </View>
            );
        }
    }

    renderDetail() {
        if (this.state.showDetail) {
            const { lsClaimHistory, style } = this.state;
            if (lsClaimHistory && lsClaimHistory.lenght > 0) {
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
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Số đơn:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.claimNo }</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Ngày nhận hồ sơ:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.claimDate }</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Quyền lợi BH:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.benefitName }</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>YC bồi thường:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.incurredAmount }</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Bồi thường:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.paidAmount }</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Bảo lãnh viện phí:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.direct }</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 4, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 16, textAlign: 'left', fontWeight: "400" }, this.props.style ]}>Tình trạng hồ sơ:</Text>
                                                    </View>
                                                    <View style={{ flex: 6, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <Text style={[ { fontFamily: 'Helvetica', fontSize: 14, textAlign: 'right' }, this.props.style ]}>{ item.claimStatus }</Text>
                                                    </View>
                                                </View>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                })
                            }
                    </View>
                );
            }
        }
        const { noRecordFound } = this.state;
        if (noRecordFound) {
            return (
                <View style={{ flex: 20 }}>
                    <Text
                        style={[ {
                            fontFamily: 'Helvetica',
                            fontSize: 18,
                            fontWeight: "500",
                            margin: 10,
                        }, this.props.style ]}
                    >Không tìm thấy kết quả phù hợp</Text>
                </View>
            );
            this.setState({
                lsClaimHistory: lsClaimHistory,
                showDetail: lsClaimHistory.length > 0,
                noRecordFound: lsClaimHistory
            });
        }
        return null;

        this.setState({
            lsClaimHistory: lsClaimHistory,
            showDetail: lsClaimHistory.length > 0,
            noRecordFound: lsClaimHistory
        });
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
                        <Title>Lịch sử</Title>
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
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full transparent bordered primary
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
                        {/* { this.renderInfo() } */}
                        { this.renderDetail() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}