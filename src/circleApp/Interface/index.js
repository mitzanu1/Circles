import React from 'react'
import actions from '../../store/actions'
import  './interface.css'
import {colors} from './colors'
import uuid from 'react-uuid'
import { useSelector } from 'react-redux'


const Interface = () => {

    const colorsArr = Object.keys(colors)
    const circles = useSelector(()=>actions.get('circles', {}))

    const handleResize = () => {
        const rect = document.getElementById('playground').getBoundingClientRect()
        Object.values(circles).forEach((circle) => {
             const { size, id, offset, posX } = circle
             const _offset = {
                x: size  / rect.width * 100,
                y: size  / rect.height * 100
            } 
            actions.update(`circles.${id}`, (value)=> value = {...circle, offset:_offset, posX: posX + (offset.x - _offset.x)})
        })
    }

    React.useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
     })

    const addCircle = () => {
     const rect = document.getElementById('playground').getBoundingClientRect()
     const randomNumber = (range) => Math.floor( Math.random() * range )
     const size = 100
     const offset = {
            x: size  / rect.width * 100,
            y: size  / rect.height * 100
        } 
         
     let posX = randomNumber(100)
     // pos > 100 (100 is width of the rect in percentage)
     while(posX > 100 - offset.x){
        posX = randomNumber(100)
       }  
     let posY = randomNumber(100)
     while(posY > 100 - offset.y){
        posY = randomNumber(100)
       }  
     const color = colorsArr[randomNumber(colorsArr.length)]
     const id = uuid()
     actions.set(`circles.${id}`, {id,posX,posY,color,size,offset})
    }
    
    const clear = () => actions.delete('circles')
    

    return (
        <div className="interfaceLayout">
            <button className="btn" onClick={addCircle}>
                Add Circle
            </button>
            <button className="btn" onClick={clear}>
                Clear
            </button>
            <p>Cick a circle and point to move</p>
        </div>
    )
}

export default Interface
