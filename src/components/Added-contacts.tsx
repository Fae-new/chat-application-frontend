import React from 'react'
import placeholderimg from '../assets/amg-e53.jpg'

import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

const ChatList = () => {

    const navigate = useNavigate()
    const contacts = useAppSelector((state) => state.chat)
    const messages = useAppSelector((state) => state.messages)


    return (
        <div className='chats'>
            <div className='userNav'>
                <img src={placeholderimg} alt="" className='profilePic' />
                <Link to='addcontact'> Add Friend</Link>
            </div>
            <input className='searchBar' placeholder='Search or Start a new chat' type="text" />
            {contacts.length !== 0 ? contacts.map((chat, index) => {
                return (
                    <div className='chat' key={index} >
                        <img src={placeholderimg} alt="profile picture" className='profilePic' />

                        <div className='previewChat'  onClick={() => { navigate(`${chat?.chatId}`) }}>
                            <div >
                                <p style={{ fontWeight: 'bold' }}>{chat?.friendName}</p>
                                <p style={{ fontSize: '12px', fontWeight: '550' }}>{messages.filter((message) => message.chatId === chat.chatId)[0]?messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].time:''}</p>
                            </div>

                            {messages.filter((message) => message.chatId === chat.chatId)[0]? <p style={{ fontSize: '14px' }}>
                                {messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].text.length > 20 ?
                                    messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].text.slice(0, 20) + '.......' :
                                    messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].text}
                            </p> : null}
                        </div>



                    </div>
                )
            }) : <h2> you have no contacts yet</h2>}
        </div>
    )
}

export default ChatList