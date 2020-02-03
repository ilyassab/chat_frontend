import {withFormik} from 'formik';
import LoginForm from "../components/LoginForm";
import validateForm from "../../../utils/validate";

import store from '../../../redux/store';
import {userActions} from "../../../redux/actions";

export default withFormik({
    mapPropsToValues: () => ({
            email: '',
            password: ''
        }
    ),

    validate: values => {
        let errors = {};

        validateForm({isAuth: true, values, errors});

        return errors;
    },

    handleSubmit: (values, {setSubmitting, setStatus}) => {
        return store.dispatch(userActions.fetchUserLogin(setSubmitting, setStatus, values));
    },

    displayName: 'LoginForm',
})(LoginForm);