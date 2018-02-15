export default img => {
    const size = {};

    if (img) {
        size.height = img.naturalHeight;
        size.width = img.naturalWidth;
    }

    return size;
};