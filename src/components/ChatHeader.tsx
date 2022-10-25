
import placeholderimg from '../assets/placeholder.jpg'
import { chatsdb } from '../data'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useWindow } from '../hooks/useWidth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ChatHeader = ({ specificChat }: { specificChat: chatsdb | null }) => {

  const { width } = useWindow()
const navigate=useNavigate()



  return (
    <div className='chatHeader'>

      <div>
        {width > 768 ? null : <ArrowBackIosIcon sx={{cursor:'pointer',marginLeft:'5px'}} onClick={()=>{navigate('/')}} />}
        <img src={placeholderimg} alt="" className='profilePic' />
      </div>

      <div className='friendNameDiv'>
        {specificChat ? <p>{specificChat.friendName}</p> : null}
        <p>Online</p>
      </div>

   <MoreVertIcon sx={{marginRight:'20px'}}/>

    </div>
  )
}

export default ChatHeader