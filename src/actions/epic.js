import { Observable } from 'rxjs';
import { doLogin, doGetUserProfile, doGetPolicyList, doGetCertificateList, doGetCertificateInfo, doGetLsClaimBenefit, doGetLsClaimHistory, doChangePassword, doGetLsHospitalAddressData, doGetLsHospitalData } from "./Api";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, SET_GLOBAL_INDICATOR_VISIBILITY, LOGOUT, GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, CLAIM_INQUIRY_GET_POLICY_LIST, CLAIM_INQUIRY_GET_POLICY_LIST_SUCCESS, CLAIM_INQUIRY_GET_CERTIFICATE_LIST, CLAIM_INQUIRY_GET_CERTIFICATE_LIST_SUCCESS, CLAIM_INQUIRY_GET_CERTIFICATE_INFO, CLAIM_INQUIRY_GET_CERTIFICATE_INFO_SUCCESS, CLAIM_INQUIRY_GET_CLAIM_BENEFIT_SUCCESS, CLAIM_HISTORY_GET_POLICY_LIST, CLAIM_HISTORY_GET_POLICY_LIST_SUCCESS, CLAIM_HISTORY_GET_CERTIFICATE_LIST, CLAIM_HISTORY_GET_CERTIFICATE_LIST_SUCCESS, CLAIM_HISTORY_GET_CERTIFICATE_INFO, CLAIM_HISTORY_GET_CERTIFICATE_INFO_SUCCESS, CLAIM_HISTORY_GET_CLAIM_HISTORY_SUCCESS, CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED, HOSPITAL_GET_ADDRESS_DATA, HOSPITAL_GET_ADDRESS_DATA_SUCCESS, HOSPITAL_ENQUIRY_DATA, HOSPITAL_ENQUIRY_DATA_SUCCESS } from "../actions/actionTypes";
import { showRequestAlert, setToken, clearToken } from "./userActions";

export default function (action$, store) {
  
  const login$ = action$.ofType(LOGIN).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doLogin(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            setToken(`${bodyInit.token}`);
            return Observable.concat(
              Observable.of({ type: LOGIN_SUCCESS, payload: { token: bodyInit.token, loginType: action.payload.loginType } }),
              Observable.of({ type: 'push', routeName: 'App'}),
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false })
            );
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Thông tin đăng nhập không hợp lệ", () => { }) }, 100)
            return Observable.concat(
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false }),
              Observable.of({ type: LOGIN_FAILED })
            );
          }
        }
      })
    );
  });

  const getUserProfile$ = action$.ofType(GET_USER_PROFILE).switchMap((action) => {
    return Observable.fromPromise(doGetUserProfile(action.payload)).mergeMap((responseData) => {
      if (responseData) {
        if (responseData.status === 200) {
          const bodyInit = JSON.parse(responseData._bodyInit);
          return Observable.concat(
            Observable.of({ type: GET_USER_PROFILE_SUCCESS, payload: { token: bodyInit.result.token, loginType: bodyInit.result.role } }),
            Observable.of({ type: 'push', routeName: 'App'}),
            Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false })
          );
        } else {
          setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
          clearToken();
          return Observable.concat(
            Observable.of({ type: 'push', routeName: 'Auth' })
          );
        }
      }
    })
  });

  const getClaimInquiryPolicyList$ = action$.ofType(CLAIM_INQUIRY_GET_POLICY_LIST).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doGetPolicyList(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            return Observable.concat(
              Observable.of({ type: CLAIM_INQUIRY_GET_POLICY_LIST_SUCCESS, payload: { lsPolicy: data } }),
              Observable.of({ type: 'push', routeName: 'ClaimInquiry' }),
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' })
            );
          }
        }
      })
    )
  });

  const getClaimInquiryCertificateList$ = action$.ofType(CLAIM_INQUIRY_GET_CERTIFICATE_LIST).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doGetCertificateList(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            return Observable.concat(
              Observable.of({ type: CLAIM_INQUIRY_GET_CERTIFICATE_LIST_SUCCESS, payload: { lsCertificate: data } }),
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' }),
            );
          }
        }
      })
    )
  });

  const getClaimInquiryCertificateInfo$ = action$.ofType(CLAIM_INQUIRY_GET_CERTIFICATE_INFO).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doGetCertificateInfo(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const result = bodyInit.result;
            return Observable.concat(
              Observable.of({ type: CLAIM_INQUIRY_GET_CERTIFICATE_INFO_SUCCESS, payload: { certificateInfo: result } }),
              Observable.fromPromise(doGetLsClaimBenefit(action.payload)).mergeMap((responseData) => {
                if (responseData.status === 200) {
                  const bodyInit = JSON.parse(responseData._bodyInit);
                  const result = bodyInit.result;
                  var data = [];
                  if (result.data) {
                    data = result.data;
                  }
                  return Observable.concat(
                    Observable.of({ type: CLAIM_INQUIRY_GET_CLAIM_BENEFIT_SUCCESS, payload: { lsBenefit: data } }),
                    Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false }),
                  )
                } else {
                  setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
                  clearToken();
                  return Observable.concat(
                    Observable.of({ type: 'push', routeName: 'Auth' }),
                  );
                }
              })
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' }),
            );
          }
        }
      })
    )
  });

  const getClaimHistoryPolicyList$ = action$.ofType(CLAIM_HISTORY_GET_POLICY_LIST).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doGetPolicyList(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            return Observable.concat(
              Observable.of({ type: CLAIM_HISTORY_GET_POLICY_LIST_SUCCESS, payload: { lsPolicy: data } }),
              Observable.of({ type: 'push', routeName: 'ClaimHistory' }),
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' })
            );
          }
        }
      })
    )
  });

  const getClaimHistoryCertificateList$ = action$.ofType(CLAIM_HISTORY_GET_CERTIFICATE_LIST).switchMap((action) => {
    return Observable.fromPromise(doGetCertificateList(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            return Observable.concat(
              Observable.of({ type: CLAIM_HISTORY_GET_CERTIFICATE_LIST_SUCCESS, payload: { lsCertificate: data } }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' }),
            );
          }
        }
      })
  });

  const getClaimHistoryCertificateInfo$ = action$.ofType(CLAIM_HISTORY_GET_CERTIFICATE_INFO).switchMap((action) => {
    return Observable.fromPromise(doGetCertificateInfo(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const result = bodyInit.result;
            return Observable.concat(
              Observable.of({ type: CLAIM_HISTORY_GET_CERTIFICATE_INFO_SUCCESS, payload: { certificateInfo: result } }),
              Observable.fromPromise(doGetLsClaimHistory(action.payload)).mergeMap((responseData) => {
                if (responseData.status === 200) {
                  const bodyInit = JSON.parse(responseData._bodyInit);
                  const result = bodyInit.result;
                  var data = [];
                  if (result.data) {
                    data = result.data;
                  }
                  return Observable.concat(
                    Observable.of({ type: CLAIM_HISTORY_GET_CLAIM_HISTORY_SUCCESS, payload: { lsClaimHistory: data } }),
                  )
                } else {
                  setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
                  clearToken();
                  return Observable.concat(
                    Observable.of({ type: 'push', routeName: 'Auth' }),
                  );
                }
              })
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' }),
            );
          }
        }
      })
  });

  const getHospitalAddressData$ = action$.ofType(HOSPITAL_GET_ADDRESS_DATA).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doGetLsHospitalAddressData(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result;
            return Observable.concat(
              Observable.of({ type: HOSPITAL_GET_ADDRESS_DATA_SUCCESS, payload: {
                  lsState: data.lsState,
                  lsDistrict: data.lsDistrict,
                  lsWard: data.lsWard
                }
              }),
              Observable.of({ type: 'push', routeName: 'Hospital' }),
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' })
            );
          }
        }
      })
    )
  });

  const getLsHospitalData$ = action$.ofType(HOSPITAL_ENQUIRY_DATA).switchMap((action) => {
    return Observable.concat(
      Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: true }),
      Observable.fromPromise(doGetLsHospitalData(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            console.log(`HospitalLsResponse=${JSON.stringify(data, null, 2)}`);
            return Observable.concat(
              Observable.of({ type: HOSPITAL_ENQUIRY_DATA_SUCCESS, payload: { lsHospital: data } }),
              Observable.of({ type: SET_GLOBAL_INDICATOR_VISIBILITY, visible: false }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' })
            );
          }
        }
      })
    )
  });

  const changePassword$ = action$.ofType(CHANGE_PASSWORD).switchMap((action) => {
    return Observable.fromPromise(doChangePassword(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.subErrors;
            if (data && data.length > 0) {
              showRequestAlert("Thông báo", "Thông tin không chính xác! Vui lòng thử lại!", () => { })
              return Observable.concat(
                Observable.of({ type: CHANGE_PASSWORD_FAILED, payload: { isChangedPassSuccess: false } }),
              );
            } else {
              setTimeout(() => { showRequestAlert("Thông báo", "Đổi mật khẩu thành công! Vui lòng thực hiện đăng nhập lại!", () => { }) }, 1000);
              clearToken();
              return Observable.concat(
                Observable.of({ type: 'push', routeName: 'Auth' })
              );
            }
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 1000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' })
            );
          }
        }
      })
  });

  const logout$ = action$.ofType(LOGOUT).switchMap(() => {
    clearToken();
    return Observable.concat(
      Observable.of({ type: 'push', routeName: 'Auth' })
    )
  });

  return Observable.merge(
    login$,
    getUserProfile$,
    getClaimInquiryPolicyList$,
    getClaimInquiryCertificateList$,
    getClaimInquiryCertificateInfo$,
    getClaimHistoryPolicyList$,
    getClaimHistoryCertificateList$,
    getClaimHistoryCertificateInfo$,
    getHospitalAddressData$,
    getLsHospitalData$,
    changePassword$,
    logout$,
  ).do(func => { console.log('epic', func); });
}