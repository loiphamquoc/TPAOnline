import React, { Component } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { Text, Header, Left, Button, Icon, Body, Title, Right, Card, CardItem, Accordion, Container, Content, ListItem, List, Input, Item } from "native-base";
import ModalFilterPicker from "react-native-modal-filter-picker";
import { showRequestAlert } from "../actions/userActions";

const { width, height } = Dimensions.get('window');

const dataArray = [
    { title: "First Element", content: "XXX" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

export default class HospitalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lsState: [],
            stateCode: '',
            displayStateCode: '',
            visibleState: false,
            lsDistrict: [],
            districtCode: '',
            displayDistrictCode: '',
            visibleDistrict: false,
            lsWard: [],
            wardCode: '',
            displayWardCode: '',
            visibleWard: false,
            hospitalCode: '',
            showDetail: false,
            lsHospital: []
        };
    }

    componentDidMount() {
        // List State
        var lsState = [];
        const lsInStoreState = this.props.hospital.lsState;
        if (lsInStoreState) {
            lsInStoreState.map((item, index) => {
                lsState.push({
                    key: item.statecode,
                    label: item.statename
                });
            })
        }
        this.setState({
            lsState: lsState,
        });
        // List District
        var lsDistrict = [];
        const lsInStoreDistrict = this.props.hospital.lsDistrict;
        if (lsInStoreDistrict) {
            lsInStoreDistrict.map((item, index) => {
                lsDistrict.push({
                    key: item.districtcode,
                    label: item.districtname
                });
            })
        }
        this.setState({
            lsDistrict: lsDistrict,
        });
        // List Ward
        var lsWard = [];
        const lsInStoreWard= this.props.hospital.lsWard;
        if (lsInStoreWard) {
            lsInStoreWard.map((item, index) => {
                lsWard.push({
                    key: item.wardcode,
                    label: item.wardname
                });
            })
        }
        this.setState({
            lsWard: lsWard,
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.hospital) {
            // Update lsState
            var lsState = [];
            const lsInStoreState = nextProps.hospital.lsState;
            if (lsInStoreState) {
                lsInStoreState.map((item, index) => {
                    lsState.push({
                        key: item.statecode,
                        label: item.statename,
                    });
                });
            }
            this.setState({
                lsState: lsState
            });

            // Update lsDistrict
            var lsDistrict = [];
            const lsInStoreDistrict = nextProps.hospital.lsDistrict;
            if (lsInStoreDistrict) {
                lsInStoreDistrict.map((item, index) => {
                    lsDistrict.push({
                        key: item.districtcode,
                        label: item.districtname,
                    });
                });
            }
            this.setState({
                lsDistrict: lsDistrict
            });

            // Update lsWard
            var lsWard = [];
            const lsInStoreWard = nextProps.hospital.lsWard;
            if (lsInStoreWard) {
                lsInStoreWard.map((item, index) => {
                    lsWard.push({
                        key: item.wardcode,
                        label: item.wardname,
                    });
                });
            }
            this.setState({
                lsWard: lsWard
            });

            // Update lsHospital
            var lsHospital = [];
            const lsInStoreHospital = nextProps.hospital.lsHospital;
            if (lsInStoreHospital) {
                lsInStoreHospital.map((item, index) => {
                    lsHospital.push({
                        hospitalCode: item.hospitalCode,
                        fullname: item.fullName,
                        address: item.address,
                        ward: item.ward,
                        district: item.district,
                        state: item.state,
                        phone: item.phone,
                        email: item.email,
                        website: item.website
                    });
                });
            }
            this.setState({
                lsHospital: lsHospital
            });
        }
    }

    resetSelected() {
        this.setState({
            lsState: [],
            stateCode: '',
            displayStateCode: '',
            visibleState: false,
            lsDistrict: [],
            districtCode: '',
            displayDistrictCode: '',
            visibleDistrict: false,
            lsWard: [],
            wardCode: '',
            displayWardCode: '',
            visibleWard: false,
            hospitalCode: '',
            showDetail: false,
        });
        this.props.onSelectAddressData({
            token: this.props.user.token,
            stateCode: '',
            districtCode: '',
            wardCode: '',
        });
    }

    selectState(value) {
        const { lsState, districtCode, wardCode } = this.state;
        var displayStateCode;
        lsState.map((item, index) => {
            if (item.key === value) {
                displayStateCode = item.label;
                return;
            }
        })
        this.setState({
            stateCode: value,
            displayStateCode: displayStateCode,
            visibleState: false
        })
        this.props.onSelectAddressData({
            token: this.props.user.token,
            stateCode: value,
            districtCode: districtCode,
            wardCode: wardCode,
        });
    }

    selectDistrict(value) {
        const { lsDistrict, stateCode, wardCode } = this.state;
        var displayDistrictCode;
        lsDistrict.map((item, index) => {
            if (item.key === value) {
                displayDistrictCode = item.label;
                return;
            }
        })
        this.setState({
            districtCode: value,
            displayDistrictCode: displayDistrictCode,
            visibleDistrict: false
        })
        this.props.onSelectAddressData({
            token: this.props.user.token,
            stateCode: stateCode,
            districtCode: value,
            wardCode: wardCode,
        });
    }

    selectWard(value) {
        const { lsWard, stateCode, districtCode } = this.state;
        var displayWardCode;
        lsWard.map((item, index) => {
            if (item.key === value) {
                displayWardCode = item.label;
                return;
            }
        })
        this.setState({
            wardCode: value,
            displayWardCode: displayWardCode,
            visibleWard: false
        })
        this.props.onSelectAddressData({
            token: this.props.user.token,
            stateCode: stateCode,
            districtCode: districtCode,
            wardCode: value,
        });
    }

    enquiryHospital() {
        const { stateCode, districtCode, wardCode, hospitalCode } = this.state;
        if (!stateCode && !districtCode && !wardCode && !hospitalCode) {
            showRequestAlert('Thông báo', 'Vui lòng nhập ít nhất một thông tin tìm kiếm!', () => {});
            return;
        }
        this.props.onEnquiryHospital({
            token: this.props.user.token,
            stateCode: stateCode,
            districtCode: districtCode,
            wardCode: wardCode,
            hospitalCode: hospitalCode,
        });
        this.setState({
            showDetail: true
        });
    }

    renderHeaderHospital(item, expanded) {
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
                <Text style={{ fontFamily: 'Helvetica', fontSize: 12, fontWeight: "300", color: 'black' }}>{ item.fullname }</Text>
                {expanded ? <Icon style={{ color: "red" }} name="remove" /> : <Icon style={{ color: "green" }} name="add" />}
            </View>
        );
    }

    renderContentHospital(item) {
        return (
            <View
                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#b6b6b6', padding: 5, height: 150 }}
            >
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10,fontWeight: "400" }}>Mã:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.hospitalCode}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Tên:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.fullname }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Địa chỉ:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.address }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Phường/Xã/Thị trấn:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.ward }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Quận/Huyện/Thị xã:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.district }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Tỉnh/Thành phố:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.province }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Số điện thoại:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.phone }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Email:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.email }</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flex: 4
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, marginLeft: 10, fontWeight: "400" }}>Website:</Text>
                    </View>
                    <View
                        style={{
                            flex: 6
                        }}
                    >
                        <Text style={{ fontFamily: 'Helvetica', fontSize: 12, color: 'black', textAlign: 'right' }}>{ item.website }</Text>
                    </View>
                </View>
            </View>
        );
    }

    renderDetail() {
        if (this.state.showDetail) {
            const { lsHospital, style } = this.state;
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
                            <Text style={{ fontFamily: 'Helvetica', fontWeight: "300", color: 'white' }}>THÔNG TIN BỆNH VIỆN</Text>
                        </View>
                        <Accordion
                            dataArray={lsHospital}
                            renderContent={this.renderContentHospital}
                            renderHeader={this.renderHeaderHospital}
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
                        <Title>Bệnh viện</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={{ flex: 1, margin: 10 }}>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full transparent bordered primary
                                onPress={() => this.setState({ visibleState: true })}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 13,
                                            fontFamily: 'Helvetica'
                                        },
                                        this.props.style
                                    ]}
                                >{ this.state.displayStateCode ? this.state.displayStateCode : "Chọn Tỉnh/Thành phố" }</Text>
                            </Button>
                            <ModalFilterPicker
                                visible={this.state.visibleState}
                                onSelect={(value) => {
                                    this.selectState(value);
                                }}
                                onCancel={() => this.setState({ visibleState: false })}
                                options={ this.state.lsState }
                                placeholderText="Chọn Tỉnh/Thành phố"
                                noResultsText="Không có kết quả"
                            />
                        </View>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full transparent bordered primary
                                onPress={() => this.setState({ visibleDistrict: true })}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 13,
                                            fontFamily: 'Helvetica'
                                        },
                                        this.props.style
                                    ]}
                                >{ this.state.displayDistrictCode ? this.state.displayDistrictCode : "Chọn Quận/Huyện/Thị xã" }</Text>
                            </Button>
                            <ModalFilterPicker
                                visible={this.state.visibleDistrict}
                                onSelect={(value) => {
                                    this.selectDistrict(value);
                                }}
                                onCancel={() => this.setState({ visibleDistrict: false })}
                                options={ this.state.lsDistrict }
                                placeholderText="Chọn Quận/Huyện/Thị xã"
                                noResultsText="Không có kết quả"
                            />
                        </View>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Button full transparent bordered primary
                                onPress={() => this.setState({ visibleWard: true })}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 13,
                                            fontFamily: 'Helvetica'
                                        },
                                        this.props.style
                                    ]}
                                >{ this.state.displayWardCode ? this.state.displayWardCode : "Chọn Phường/Xã/Thị trấn" }</Text>
                            </Button>
                            <ModalFilterPicker
                                visible={this.state.visibleWard}
                                onSelect={(value) => {
                                    this.selectWard(value);
                                }}
                                onCancel={() => this.setState({ visibleWard: false })}
                                options={ this.state.lsWard }
                                placeholderText="Chọn Phường/Xã/Thị trấn"
                                noResultsText="Không có kết quả"
                            />
                        </View>
                        <View style={{ flex: 10, marginBottom: 5, }}>
                            <Item>
                                <Input
                                    placeholder="Nhập Mã hoặc Tên Bệnh viện/Phòng khám"
                                    autoCapitalize="none"
                                    onChangeText={(value) => {
                                        this.setState({
                                            hospitalCode: value
                                        });
                                    }}
                                    value={this.state.hospitalCode}
                                />
                            </Item>
                        </View>
                        <View style={{ flex: 10, marginBottom: 5, flexDirection: 'row' }}>
                        <Content
                                stlye={{
                                    flex: 5,
                                    marginRight: 10,
                                }}
                            >
                                <Button full danger
                                    onPress={() => {
                                        this.enquiryHospital();
                                    }}
                                >
                                    <Text style={[
                                        {
                                            color: 'white',
                                            fontFamily: 'Helvetica',
                                        },
                                        this.props.style
                                        ]}>Truy vấn</Text>
                                </Button>
                            </Content>
                            <Content
                                stlye={{
                                    flex: 5,
                                    marginLeft: 10,
                                }}
                            >
                                <Button full warning
                                    onPress={() => {
                                        this.resetSelected();
                                    }}
                                >
                                    <Text style={[
                                        {
                                            color: 'white',
                                            fontFamily: 'Helvetica',
                                        },
                                        this.props.style
                                        ]}>Mặc định</Text>
                                </Button>
                            </Content>
                        </View>
                        { this.renderDetail() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}