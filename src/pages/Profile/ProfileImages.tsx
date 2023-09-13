/** @jsxImportSource @emotion/react */
import { Utils } from 'src/utils/Utils'
import Setter = Utils.Setter
import { css } from '@emotion/react'
import React from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import rowWrap = EmotionCommon.rowWrap
import center = EmotionCommon.center
import Card from 'src/components/Card'





export type ProfileImagesProps = {
  images: string[]
  setImages: Setter<string[]>
}
const ProfileImages = ({ images, setImages }: ProfileImagesProps)=>{
  
  return <Card>
    <div css={t => css`
      ${rowWrap};
      gap: 6px;
    `}>
      {images.map(im => <div
          
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
                width: 100px; height: 100px;
                ${center};
                border-radius: 6px;
                overflow: hidden;
              `}
        >
          <img
            src={im}
            css={css`
                  width: 100%; height: 100%;
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