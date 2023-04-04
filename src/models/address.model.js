const addressSchema = require('./address.mongo')
const { v4: uuidv4 } = require('uuid');

function removeIdAndReturnAddress(data, uuid) {
    data = data.address.map(({ _id, ...rest }) => {
        if (rest.addressId == uuid) return rest
        else return null
    }).filter(ele => ele != null)
    return data
}
function removeId(data){
    data = data.address.map(({ _id, ...rest }) =>rest)
    return data
}

module.exports = {
    addNewAddress: async (address, userId) => {
        const addressId = uuidv4()
        address.addressId = addressId
        try {
            return await addressSchema.findOne({ userId })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(data => {
                    if (data) {
                        return addressSchema.findOneAndUpdate({ userId }, {
                            $push: {
                                address: address
                            }
                        }, { new: true })
                            .then(res => JSON.parse(JSON.stringify(res)))
                            .then(data => {
                                data = removeIdAndReturnAddress(data, addressId)
                                return data
                            })
                    } else {
                        return false
                    }
                })
                .then((res) => {
                    if (res) return Promise.resolve(res)
                    else {
                        const data = new addressSchema({
                            userId,
                            address: [address]
                        })
                        return data.save()
                            .then(res => JSON.parse(JSON.stringify(res)))
                            .then(data => {
                                data = removeIdAndReturnAddress(data, addressId)
                                return Promise.resolve(data)
                            }
                            )
                    }
                })

        } catch (err) {
            return Promise.reject('Address not updated')
        }
    },

    getAllAddress: async (userId) => {
        try {

            return await addressSchema.findOne({ userId }, { address: 1, _id: 0 })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(data =>{
                    data = removeId(data)
                    return Promise.resolve(data)
                })

        } catch (err) {
            return Promise.reject('Not able to get Address!')
        }
    }
}