import { RootNavigator } from '../components/AppNavigator'
import { NavigationActions } from 'react-navigation'

const getActiveRoute = (state) => {
    if (state.index !== undefined) {
        return getActiveRoute(state.routes[state.index]);
    } else {
        return state;
    }
}
export default function routers(state, action) {
    switch (action.type) {
        case 'push': {
            const lastRoute = getActiveRoute(state);
            if (action.routeName == lastRoute.routeName) {
                return state;
            }

            let newState = RootNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: action.routeName, params: { object: action.object }
            }), state)
            return (newState ? newState : state)
        }
        case 'pop': {
            const lastRoute = getActiveRoute(state);
            if (lastRoute.routeName === RouteKey.HomeScreen) {
                return state;
            }
            let newState = RootNavigator.router.getStateForAction(NavigationActions.back(), state)
            return (newState ? newState : state)
        }
        // case 'popToRoot':
        // case 'reset':
        //     return {
        //         ...state,
        //         index: 0,
        //         routes: [{key: 'Init', routeName: RouteKey.Login}]
        //     }
        // case 'resetToRoute':
        //     const newState = RootNavigator.router.getStateForAction(NavigationActions.reset({
        //         index: 0,
        //         key: action.key,
        //         actions: [
        //         NavigationActions.navigate({routeName: action.routeName, params: {object: action.object}})
        //         ]
        //     }), state)
        //     return newState || state     
        default: {
            let newState = RootNavigator.router.getStateForAction(action, state)
            return (newState ? newState : state)
        }
    }
}