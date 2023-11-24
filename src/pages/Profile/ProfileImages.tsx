/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import Card from 'src/views/Card'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter




export type ProfileImagesProps = {
  images: string[]
  setImages: Setter<string[]>
}
const ProfileImages = ({ images, setImages }: ProfileImagesProps)=>{
  
  
  return <Card>
    <div css={t=>css`
      display: grid;
      width: 100%;
      max-width: 500px;
      height: auto;
      grid:
        'im1 im1 im2' auto
        'im1 im1 im3' auto
        'im4 im5 im6' auto
      / 1fr 1fr 1fr
      ;
      place-items: stretch;
      gap: 12px;
    `}>
      {images.map((im,i) => <div
          
          draggable
          onDragStart={ev => {
            ev.dataTransfer.setData('text/plain', im)
          }}
          
          onDragOver={ev => {
            ev.preventDefault()
            ev.dataTransfer.dropEffect = 'move'
          }}
          onDrop={ev => {
            ev.preventDefault()
            const data = ev.dataTransfer.getData('text/plain')
            const thisImIdx = images.findIndex(val => val === im)
            const droppedImIdx = images.findIndex(val => val === data)
            const newImages = [...images]
            newImages[thisImIdx] = data
            newImages[droppedImIdx] = im
            setImages(newImages)
          }}
          
          key={im}
          css={css`
            grid-area: im${i+1};
            ${center};
            border-radius: 12px;
            overflow: hidden;
          `}
        >
          <img
            src={im}
            css={css`
              width: 100%;
              aspect-ratio: 1;
              object-position: center;
              object-fit: cover;
            `}
          />
        </div>,
      )}
    </div>
  </Card>
}
export default ProfileImages