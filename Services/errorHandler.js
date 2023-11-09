const InputError = (error) => {
    if (Object.keys(error).length > 0) {
        return Object.values(error)[0].message
    } else {
        return `Server error. Please try again.`;
    }
}

module.exports = {
    InputError

}
