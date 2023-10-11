export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
}

export const formatInputDate = (date) => {
    const monthDay = date.slice(5);
    const year = date.substring(0,4);
    return `${monthDay}-${year}`;
}

export const formatYoutubeUrl = (url) => {
        const removeFirstCharacter = url.substring(1);
        return removeFirstCharacter.slice(0, -1);
}