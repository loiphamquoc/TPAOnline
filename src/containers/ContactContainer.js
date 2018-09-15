import { connect } from "react-redux";
import ContactComponent from "../components/ContactComponent";

const mapStateToProps = (state) => {
    const { } = state;
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToHomePage: () => dispatch({ type: 'push', routeName: 'Home' }),
    }
}

const ContactContainer = connect(mapStateToProps, mapDispatchToProps)(ContactComponent);

export default ContactContainer;