
import placeholderimg from '../assets/amg-e53.jpg'
import { chatsdb} from '../data'


const ChatHeader = ({ specificChat }: { specificChat: chatsdb|null }) => {

  return (
    <div className='chatHeader'>
    <img src={placeholderimg} alt="" className='profilePic' />
    <div>
      {specificChat?  <p>{specificChat.friendName}</p>:null}
        <p>Online</p>
    </div>

    <div >
    <img src="https://cdn-icons-png.flaticon.com/512/54/54719.png" alt="" />
      <img src="https://cdn-icons-png.flaticon.com/512/2311/2311524.png" alt="" />
    </div>


</div>
  )
}

export default ChatHeader