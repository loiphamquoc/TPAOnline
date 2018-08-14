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
            'Content-Type': 'application/json',
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