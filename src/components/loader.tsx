import React from 'react'

const Loader = ({height}:{height:string}) => {
  return (
  <div style={{display:'grid', placeItems:'center' ,height:height,width:'inherit'}}> <div className="lds-hourglass"></div></div> 
  )
}

export default Loader