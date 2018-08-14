import { Observable } from 'rxjs';
import { doLogin, doGetUserProfile, doGetPolicyList, doGetCertificateList } from "./Api";
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, SET_GLOBAL_INDICATOR_VISIBILITY, LOGOUT, GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_POLICY_LIST, GET_POLICY_LIST_SUCCESS, GET_CERTIFICATE_LIST, GET_CERTIFICATE_LIST_SUCCESS } from "../actions/actionTypes";
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
          setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 3000)
          clearToken();
          return Observable.concat(
            Observable.of({ type: 'push', routeName: 'Auth' })
          );
        }
      }
    })
  });

  const getPolicyList$ = action$.ofType(GET_POLICY_LIST).switchMap((action) => {
    return Observable.fromPromise(doGetPolicyList(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            return Observable.concat(
              Observable.of({ type: GET_POLICY_LIST_SUCCESS, payload: { lsPolicy: data } }),
              Observable.of({ type: 'push', routeName: 'ClaimInquiry' }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 3000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' })
            );
          }
        }
      })
  });

  const getCertificateList$ = action$.ofType(GET_CERTIFICATE_LIST).switchMap((action) => {
    return Observable.fromPromise(doGetCertificateList(action.payload)).mergeMap((responseData) => {
        if (responseData) {
          if (responseData.status === 200) {
            const bodyInit = JSON.parse(responseData._bodyInit);
            const data = bodyInit.result.data;
            return Observable.concat(
              Observable.of({ type: GET_CERTIFICATE_LIST_SUCCESS, payload: { lsCertificate: data } }),
            )
          } else {
            setTimeout(() => { showRequestAlert("Thông báo", "Phiên làm việc đã hết hạn! Vui lòng đăng nhập lại", () => { }) }, 3000)
            clearToken();
            return Observable.concat(
              Observable.of({ type: 'push', routeName: 'Auth' }),
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
    getPolicyList$,
    getCertificateList$,
    logout$,
  ).do(func => { console.log('epic', func); });
}