import { withFormik } from 'formik';
import RegisterForm from "../components/RegisterForm";
import validateForm from "../../../utils/validate";
import store from "../../../redux/store";
import {userActions} from "../../../redux/actions";

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        fullname: '',
        password2: '',
    }),

    validate: values => {
        let errors = {};
        validateForm({isAuth: false, values, errors});
        return errors;
    },

    handleSubmit: (values, { setSubmitting, setStatus }) => {
        return store.dispatch(userActions.fetchUserRegister(setSubmitting, setStatus, values));
    },

    displayName: 'RegisterForm',
})(RegisterForm);