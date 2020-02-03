export default (key, touched, errors) => {
    return !touched[key] ? '' : errors[key] ? 'error' : 'success';
}