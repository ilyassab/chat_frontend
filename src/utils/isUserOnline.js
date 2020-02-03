export default (userTime) => {
    let min = 5;
    return (+Date.now() - new Date(userTime)) < (min * 60 * 1000);
}
