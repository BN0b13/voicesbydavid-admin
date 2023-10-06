export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
}