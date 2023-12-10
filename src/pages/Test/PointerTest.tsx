/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { useState } from 'react'
import { Pages } from 'src/components/Page/Pages'
import SimplePage = Pages.SimplePage
import SimpleContent = Pages.SimpleContent




const PointerTest =
React.memo(
()=>{
  
  const squareRef = useRef<HTMLDivElement>(null)
  const square2Ref = useRef<HTMLDivElement>(null)
  const textDivRef = useRef<HTMLDivElement>(null)
  const [pressed, setPressed] = useState(false)
  
  
  
  /* useEffect(
    ()=>{
      const square = squareRef.current
      if (square){
        
        const onPointerDown = (ev:PointerEvent)=>{
          setPressed(true)
          if (textDivRef.current) textDivRef.current.innerHTML += 'ref pointer down<br/>'
        }
        square.addEventListener('pointerdown',onPointerDown)
        return ()=>{
          square.removeEventListener('pointerdown',onPointerDown)
        }
      }
    },
    [squareRef.current]
  ) */
  
  
  
  useEffect(
    ()=>{
      const square = squareRef.current
      if (square){
        const onPointerDown = ()=>{}
        square.addEventListener('pointerdown',onPointerDown)
        return ()=>{
          square.removeEventListener('pointerdown',onPointerDown)
        }
      }
    },
    [squareRef.current]
  )
  
  
  useEffect(
    ()=>{},
    undefined
  )
  
  
  
  return <SimplePage>
    <SimpleContent>
      
      <div css={css`
        background: skyblue;
        width: 200px;
        height: 200px;
        ${pressed && css`background: lightgreen;`}
        //touch-action: none;
      `}
        ref={squareRef}
        onClick={ev=>{
          if (textDivRef.current) textDivRef.current.innerHTML += 'click<br/>'
        }}
        onPointerDown={ev=>{
          setPressed(true)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer down<br/>'
        }}
        onPointerCancel={ev=>{
          setPressed(false)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer cancel<br/>'
        }}
        onPointerOut={ev=>{
          setPressed(false)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer out<br/>'
        }}
        onPointerUp={ev=>{
          setPressed(false)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer up<br/>'
        }}
        // onTouchStart={ev=>{
        //   setPressed(true)
        //   if (textDivRef.current) textDivRef.current.innerHTML += 'touch start<br/>'
        // }}
        // onTouchCancel={ev=>{
        //   setPressed(false)
        //   if (textDivRef.current) textDivRef.current.innerHTML += 'touch cancel<br/>'
        // }}
        // onTouchEnd={ev=>{
        //   setPressed(false)
        //   if (textDivRef.current) textDivRef.current.innerHTML += 'touch end<br/>'
        // }}
      />
      
      <div css={css`
        background: skyblue;
        width: 200px;
        height: 200px;
        ${pressed && css`background: lightgreen;`}
        //touch-action: none;
      `}
        ref={square2Ref}
        onClick={ev=>{
          if (textDivRef.current) textDivRef.current.innerHTML += 'click<br/>'
        }}
        onPointerDown={ev=>{
          setPressed(true)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer down<br/>'
        }}
        onPointerCancel={ev=>{
          setPressed(false)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer cancel<br/>'
        }}
        onPointerOut={ev=>{
          setPressed(false)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer out<br/>'
        }}
        onPointerUp={ev=>{
          setPressed(false)
          if (textDivRef.current) textDivRef.current.innerHTML += 'pointer up<br/>'
        }}
        // onTouchStart={ev=>{
        //   setPressed(true)
        //   if (textDivRef.current) textDivRef.current.innerHTML += 'touch start<br/>'
        // }}
        // onTouchCancel={ev=>{
        //   setPressed(false)
        //   if (textDivRef.current) textDivRef.current.innerHTML += 'touch cancel<br/>'
        // }}
        // onTouchEnd={ev=>{
        //   setPressed(false)
        //   if (textDivRef.current) textDivRef.current.innerHTML += 'touch end<br/>'
        // }}
      />
      
      <div css={t=>css`
        color: ${t.page.content[0]};
      `}
        ref={textDivRef}
      />
      
    </SimpleContent>
  </SimplePage>
})
export default PointerTest

