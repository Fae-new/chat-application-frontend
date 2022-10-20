
export interface messsage{
    text:string;
    senderId:string;
    date:string;  
    chatId:string;
}

// export interface chatType {
//     chatId: number;
//     name: string;
//     sentUid:string;
//     messages: Message[];
// }

export interface chatsdb{
  friendName:string ; 
chatId:string;
friendId:string;

}

export interface userSliceType{
    uid: string;
    userName: string;
    email:string; 
}

export interface userType{
    uid: string;
    userName: string;
    email:string;
contacts:chatsdb[];
messages:messsage[]
}




export class Message{
text:string;
sentUid:string
time:Date;
chatId:string
  
    constructor(text:string,sentUid:string,time:Date,chatId:string) {
    this.text=text,
    this.sentUid=sentUid,
    this.time=time,
this.chatId=chatId
    }
}



 


// export const chatData = {
//     uid:63,
    
//   chats:  [

//     {
//         chatId: 1,
//         name: 'Jane',
//         uid:10,
//         messages: [new Message('hello',1,'8:00'),new Message('hi',1,'11:10')],
     
//     },
//     {
//         chatId: 2,
//         name: 'Janet',
//         uid:11,
//         messages:  [new Message('good morning',2,'8:00'),new Message('Check twitter',2,'11:20')],
   
//     },


//     {    chatId: 3,
//         name: 'Chinedu',
//         uid:12,
//         messages:  [new Message('Best in english',3,'8:00'),new Message('Buy corn for me',3,'11:30')],
   
    
//     }]}

//  export const user1:userType = { uid: 63, userName: 'Jibola' }



