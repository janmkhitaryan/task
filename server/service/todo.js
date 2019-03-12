const Todo = require('../models/Items')

const GetList = async () => {
    const list = await Todo.find({})
    return list
}
const getItem = async (id) => {
    const item = await Todo.findOne({ id })
    return item
}

const createItem = async (desc) => {
    console.log("desc--->>>", desc)
    if (desc) {
        const newItem = new Todo({ desc })
        await newItem.save()
        console.log(newItem)
    }
}

const deleteItem = async (id) => {
    const item = await Todo.findOneAndDelete({ _id: id })
    if (item) {
        return { status: "ok" }
    }
    else {
        return { status: "error" }
    }
}
const itemUpdate = async (id, completed ) => {
    const item = await Todo.findByIdAndUpdate({ _id: id }, { completed })
    return item
}


module.exports = {
    GetList,
    getItem,
    createItem,
    deleteItem,
    itemUpdate
}