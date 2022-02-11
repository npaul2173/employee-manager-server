const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        required: true,
    },
})

const Counter = mongoose.model('Counter', CounterSchema)

const insertCounter = (seqName) => {
    const newCounter = new Counter({
        _id: seqName,
        seq: 1,
        name: 'Employees Id',
    })
    console.log('Inside Inser Counter, ', newCounter)
    return new Promise((resolve, reject) => {
        newCounter
            .save()
            .then((data) => {
                resolve(data.seq)
            })
            .catch((err) => reject(err))
    })
}

const getSequenceNextValue = (seqName) => {
    console.log('Inside get Sequence Next Value', seqName)
    return new Promise((resolve, reject) => {
        Counter.findByIdAndUpdate(
            { _id: seqName },
            { $inc: { seq: 1 } },
            (error, counter) => {
                if (error) {
                    reject(error)
                }
                if (counter) {
                    resolve(counter.seq + 1)
                } else resolve(null)
            }
        )
    })
}
module.exports = { Counter, getSequenceNextValue, insertCounter }
