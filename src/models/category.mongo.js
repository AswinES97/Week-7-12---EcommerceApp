const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    Men: {
        Topwear: {
            type: Array,
            uppercase: true
        },
        Bottomwear: {
            type: Array,
            uppercase: true
        },
        Footware: {
            type: Array,
            uppercase: true
        }
    },
    Women: {
        Topwear: {
            type: Array,
            uppercase: true
        },
        Bottomwear: {
            type: Array,
            uppercase: true
        },
        Footware: {
            type: Array,
            uppercase: true
        }
    }
}, { versionKey: false })

module.exports = mongoose.model('Category', categorySchema)

// const ParentCategory = new mongoose.Schema({
//     parentId: nanoid(),
//     name: {
//         type: String,
//         required: true
//     }
// })

// const Category = new mongoose.Schema({
//     parentId:{
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     subcategory: [
//         {
//             name: {
//                 type: String,
//             }
//         }
//     ]
// })