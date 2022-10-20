

const EmojiKeyboard = ({typeEmoji,toggle,toggleFunction}:{typeEmoji:(e:React.MouseEvent< HTMLParagraphElement,MouseEvent>)=>void,toggle:boolean,toggleFunction:()=>void}) => {
  
  
    return (
        <div className='emojiKeyboard' style={ toggle?{top:'-100vh'}:{top:'230px'}}>

<div style={{justifyContent:'flex-end',height:'40px',alignItems:'center',borderBottom:'1px solid lightgray'}}>
   <img src="https://cdn-icons-png.flaticon.com/512/660/660252.png" alt="" style={{width:'30px',marginRight:'10px'}} onClick={toggleFunction} />
</div>

            <div>
                <p onClick={(e)=>{typeEmoji(e)}}>😀</p>
              <p onClick={(e)=>{typeEmoji(e)}}>🤣</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😅</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😊</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😍</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😗</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤩</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😐</p>
            </div>

            <div>
                <p onClick={(e)=>{typeEmoji(e)}}>🙄</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😥</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😯</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😁</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😃</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😆</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😋</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😘</p>
            </div>

            <div>
                <p onClick={(e)=>{typeEmoji(e)}}>😙</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🙂</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤔</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😑</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😏</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😮</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😪</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😂</p>
            </div>

            <div>
                <p onClick={(e)=>{typeEmoji(e)}}>😄</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😉</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😎</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🥰</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😚</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤗</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤨</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😶</p>
            </div>


            <div>
                <p onClick={(e)=>{typeEmoji(e)}}>😣</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤐</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😫</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😭</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😦</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤯</p>
                <p onClick={(e)=>{typeEmoji(e)}}>😡</p>
                <p onClick={(e)=>{typeEmoji(e)}}>🤬</p>
            </div>



        </div>
    )
}

export default EmojiKeyboard




















