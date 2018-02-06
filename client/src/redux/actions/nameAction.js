export default ({name = '', auth} = {}) => ({
    type: 'GETNAME',
    name,
    auth
});