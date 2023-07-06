import mongoose from "mongoose"

const collection = "messages"

const messagesSchema = new mongoose.Schema({
    socketId: {
        type: String 
    },
    message: {
        type: String 
    },
})

export const messagesModel = mongoose.model(collection, messagesSchema)