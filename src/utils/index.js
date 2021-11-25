export const preventDefault = (e) => {
    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
}