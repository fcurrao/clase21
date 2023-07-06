
import mongoose from 'mongoose' 
import { messagesModel } from './models/messages.model';
import { environment } from '../.env/environment';


export default class MessageManager {
  connection = mongoose.connect(environment.mongoConnection)
  


  async addChat(chat) {
    let result = await messagesModel.create(chat) 
    return result;
   }


}