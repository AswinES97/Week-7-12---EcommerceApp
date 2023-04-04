module.exports = {
    removeId: (data)=>{
        data = data.map(({ _id, ...rest }) => rest)
        return data
    },
}