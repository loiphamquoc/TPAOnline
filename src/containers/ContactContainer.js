import { connect } from "react-redux";
import ContactComponent from "../components/ContactComponent";

const mapStateToProps = (state) => {
    const { } = state;
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const ContactContainer = connect(mapStateToProps, mapDispatchToProps)(ContactComponent);

export default ContactContainer;