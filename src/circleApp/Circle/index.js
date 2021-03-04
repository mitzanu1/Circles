import React from 'react'
import actions from '../../store/actions'
import  './circle.css'
import { useSelector } from 'react-redux' 


const Circle = () => {
    const circles = useSelector(()=>actions.get('circles',{}))
    const [selectedCircle, setSelectedCircle] = React.useState({})
    
    const selectCircle = (e,id) => {
        e.stopPropagation()
        setSelectedCircle(actions.get(`circles.${id}`,{}))
    }

    const move = (e) => {
        e.stopPropagation()
        const elem = document.getElementById('playground')
        const rect = elem.getBoundingClientRect()

        
        if(selectedCircle.id){

            const clickedPosX = (e.clientX - rect.x) / rect.width * 100
            const x =  clickedPosX > 100 - selectedCircle.offset.x 
            ? 100 - selectedCircle.offset.x 
            : clickedPosX
    
            const clickedPosY = (e.clientY - rect.y) / rect.height * 100
            const y = clickedPosY > 100 - selectedCircle.offset.y 
            ? 100 - selectedCircle.offset.y 
            : clickedPosY 
            
            actions.update(`circles.${selectedCircle.id}.posX`,(value)=> value = x)  
            actions.update(`circles.${selectedCircle.id}.posY`,(value)=> value = y )
        }
    }

    return (<div className='playground' id='playground' onClick={(e)=>move(e)}>
        {
            Object.values(circles).map((ele)=>{
                const {id,posX,posY,color,size} = ele
                                
                return (
                  <button key={id} className="circle" style={{left:`${posX}%`,top:`${posY}%`,background:color,width:`${size}px`,height:`${size}px` }} onClick={(e)=>selectCircle(e,id)} ></button>
                )
            })
        }
        
    </div>
    )
}

export default Circle


