const { removeId } = require('../services/remId');
const addressSchema = require('./address.mongo')
const { v4: uuidv4 } = require('uuid');

function removeIdAndReturnAddress(data, uuid) {
    data = data.address.map(({ _id, ...rest }) => {
        if (rest.addressId == uuid) return rest
        else return null
    }).filter(ele => ele != null)
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
                .then(data => {
                    if(data){
                        data = removeId(data.address)
                        return Promise.resolve(data)
                    }else{
                        return Promise.resolve(data)
                    }
                })

        } catch (err) {
            return Promise.reject('Not able to get Address!')
        }
    },

    getSingleAddress: async (userId, addressId) => {
        try {
            return await addressSchema.findOne({ userId, 'address.addressId': addressId }, { 'address.$': 1 })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(data => {
                    const address = removeId(data.address)
                    return Promise.resolve(address)
                })

        } catch (err) {
            return Promise.reject('No address found')
        }
    },

    updateAddress: async (userId, data) => {
        try {
            return await addressSchema.findOneAndUpdate({ userId, 'address.addressId': data.addressId }, {
                $set: {
                    'address.$.name': data.name,
                    'address.$.address1': data.address1,
                    'address.$.address2': data.address2,
                    'address.$.city': data.city,
                    'address.$.state': data.state,
                    'address.$.country': data.country,
                    'address.$.postal_code': data.postal_code,
                    'address.$.phone': data.phone
                }
            }, { new: true })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(res => Promise.resolve(data.addressId))
                .catch(err => console.log(err))
        } catch (err) {
            return Promise.reject("Mongo error!")
        }
    },

    deleteaddress: async (userId, addressId)=>{
        try {
            console.log(userId,addressId);
            return await addressSchema.findOneAndUpdate({userId},{
                $pull:{
                    address : { addressId: addressId }
                }
            })
            .then(res => {
                console.log(res);
            })

        } catch (err) {
            console.log(err);
        }
    }
}