export function doLogin(user) {
    var base64 = require('base-64');
    const userLogin = new FormData();
    userLogin.append("loginType", user.loginType);
    userLogin.append("username", user.username);
    const encPass = base64.encode(user.password);
    userLogin.append("password", encPass);
    const url = `${baseUrl}/authentication`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: userLogin
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetUserProfile(token) {
    const url = `${baseUrl}/user/userinfo`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetPolicyList(token) {
    const url = `${baseUrl}/claim/loadPolicyList`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetCertificateList(criteria) {
    const url = `${baseUrl}/claim/loadCertificate`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': criteria.token,
        },
        body: JSON.stringify({
            '_poNo': criteria.policyCode,
            '_txtSearch': ''
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetCertificateInfo(criteria) {
    const url = `${baseUrl}/claim/loadCertificateDetails`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': criteria.token,
        },
        body: JSON.stringify({
            '_poNo': criteria.policyCode,
            '_cerNo': criteria.certificateNo
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetLsClaimBenefit(criteria) {
    const url = `${baseUrl}/claim/loadBenefitInquiryDetails`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': criteria.token,
        },
        body: JSON.stringify({
            '_poNo': criteria.policyCode,
            '_cerNo': criteria.certificateNo
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetLsClaimHistory(criteria) {
    const url = `${baseUrl}/claim/loadClaimDetails`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': criteria.token,
        },
        body: JSON.stringify({
            '_poNo': criteria.policyCode,
            '_cerNo': criteria.certificateNo
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetLsHospitalAddressData(criteria) {
    const url = `${baseUrl}/hospital/getHospitalAddressData`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': criteria.token,
        },
        body: JSON.stringify({
            '_state': criteria.stateCode,
            '_district': criteria.districtCode,
            '_ward': criteria.wardCode,
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doGetLsHospitalData(criteria) {
    const url = `${baseUrl}/hospital/loadHospitalListData`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': criteria.token,
        },
        body: JSON.stringify({
            '_state': criteria.stateCode,
            '_district': criteria.districtCode,
            '_ward': criteria.wardCode,
            '_txtSearch': criteria.hospitalCode,
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}

export function doChangePassword(data) {
    const url = `${baseUrl}/user/saveChangePassword`;
    const response = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': data.token,
        },
        body: JSON.stringify({
            '_oldPassword': data.curPassword,
            '_newPassword': data.newPassword,
            '_confirmPassword': data.reNewPassword
        })
    }).then(response => {
        return response;
    }).catch(err => {
        return err;
    });
    return response;
}