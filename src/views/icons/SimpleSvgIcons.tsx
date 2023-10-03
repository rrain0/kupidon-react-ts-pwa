/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'
import {ReactUtils} from "src/utils/common/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import { ReactComponent as Arrow1DownSvg } from 'src/res/icon/arrow-1-down.svg'
import { ReactComponent as Arrow2ForwardSvg } from 'src/res/icon/arrow-2-forward.svg'
import { ReactComponent as Arrow3UpRightSvg } from 'src/res/icon/arrow-3-up-right.svg'
import { ReactComponent as Arrow4DownSvg } from 'src/res/icon/arrow-4-down.svg'
import { ReactComponent as Arrow5FwdSvg } from 'src/res/icon/arrow-5-fwd.svg'
import { ReactComponent as ArrowReloadSvg } from 'src/res/icon/arrow-reload.svg'

import { ReactComponent as BrowserSvg } from 'src/res/icon/browser.svg'

import { ReactComponent as CardsHeartSvg } from 'src/res/icon/cards-heart.svg'
import { ReactComponent as CautionSvg } from 'src/res/icon/caution.svg'
import { ReactComponent as ChatRoundSvg } from 'src/res/icon/chat-round.svg'
import { ReactComponent as CheckmarkSvg } from 'src/res/icon/checkmark.svg'
import { ReactComponent as ClearTrashSvg } from 'src/res/icon/clear-trash.svg'
import { ReactComponent as ClipSvg } from 'src/res/icon/clip.svg'
import { ReactComponent as Cross2Svg } from 'src/res/icon/cross-2.svg'

import { ReactComponent as DaySvg } from 'src/res/icon/day.svg'
import { ReactComponent as DayNightSvg } from 'src/res/icon/day-night.svg'
import { ReactComponent as DoubleCheckmarkSvg } from 'src/res/icon/double-checkmark.svg'

import { ReactComponent as EyeSvg } from 'src/res/icon/eye.svg'
import { ReactComponent as EyeCrossedOutSvg } from 'src/res/icon/eye-crossed-out.svg'

import { ReactComponent as FloppyDisk1Svg } from 'src/res/icon/floppy-disk-1.svg'
import { ReactComponent as FloppyDisk2Svg } from 'src/res/icon/floppy-disk-2.svg'
import { ReactComponent as FloppyDisk3Svg } from 'src/res/icon/floppy-disk-3.svg'

import { ReactComponent as GearSvg } from 'src/res/icon/gear.svg'
import { ReactComponent as Gear2Svg } from 'src/res/icon/gear-2.svg'

import { ReactComponent as HeartSvg } from 'src/res/icon/heart.svg'
import { ReactComponent as HelpSvg } from 'src/res/icon/help.svg'
import { ReactComponent as HomeSvg } from 'src/res/icon/home.svg'

import { ReactComponent as MailSvg } from 'src/res/icon/mail.svg'

import { ReactComponent as NightSvg } from 'src/res/icon/night.svg'

import { ReactComponent as PencilWriteSvg } from 'src/res/icon/pencil-write.svg'
import { ReactComponent as Plane1Svg } from 'src/res/icon/plane-1.svg'
import { ReactComponent as ProfileSvg } from 'src/res/icon/profile.svg'

import { ReactComponent as RadioActiveSvg } from 'src/res/icon/radio-active.svg'
import { ReactComponent as RadioInactiveSvg } from 'src/res/icon/radio-inactive.svg'
import { ReactComponent as RingingBellSvg } from 'src/res/icon/ringing-bell.svg'

import { ReactComponent as SearchSvg } from 'src/res/icon/search.svg'
import { ReactComponent as Spinner8LinesSvg } from 'src/res/icon/spinner-8-lines.svg'



export namespace SimpleSvgIcons {

  // Base interface for simple svg icons
  
  type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
  type CustomIconProps = {
    mainColor?: string|undefined
    size?: number|string|undefined
  }
  type SvgElement = {
    SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
  }
  
  
  export type SimpleSvgIconProps = CustomIconProps & SvgProps & SvgElement
  export const SimpleSvgIcon = ReactMemoTyped(
    (props: SimpleSvgIconProps) => {
      let {
        className,
        mainColor, size,
        SvgComponent,
        ...restProps
      } = props
      
      return <SvgComponent
        css={css`
          width: ${size ?? 'var(--icon-size)'};
          height: ${size ?? 'var(--icon-size)'};
          max-width: 100%;
          max-height: 100%;
          fill: ${mainColor ?? 'var(--icon-color, black)'};
          stroke: ${mainColor ?? 'var(--icon-color, black)'};
        `}
        className={classNames(className,'rrainuiIcon')}
        {...restProps}
      />
    }
  )
  
  
  
  
  // Icons
  
  export type IconProps = CustomIconProps & SvgProps
  
  export const Arrow1DownIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow1DownSvg} />
  )
  
  export const Arrow2ForwardIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow2ForwardSvg} />
  )
  
  export const Arrow3UpRightIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow3UpRightSvg} />
  )
  
  export const Arrow4DownIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow4DownSvg} />
  )
  
  export const Arrow5FwdIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow5FwdSvg} />
  )
  
  export const ArrowReloadIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ArrowReloadSvg} />
  )
  
  export const BrowserIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={BrowserSvg} />
  )
  
  export const CardsHeartIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CardsHeartSvg} />
  )
  
  export const CautionIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CautionSvg} />
  )
  
  export const ChatRoundIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ChatRoundSvg} />
  )
  
  export const CheckmarkIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CheckmarkSvg} />
  )
  
  export const ClearTrashIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ClearTrashSvg} />
  )
  
  export const ClipIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ClipSvg} />
  )
  
  export const Cross2Ic = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Cross2Svg} />
  )
  
  export const DayIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DaySvg} />
  )
  
  export const DayNightIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DayNightSvg} />
  )
  
  export const DoubleCheckmarkIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DoubleCheckmarkSvg} />
  )
  
  export const EyeIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={EyeSvg} />
  )
  
  export const EyeCrossedOutIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={EyeCrossedOutSvg} />
  )
  
  export const FloppyDisk1Ic = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={FloppyDisk1Svg} />
  )
  
  export const FloppyDisk2Ic = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={FloppyDisk2Svg} />
  )
  
  export const FloppyDisk3Ic = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={FloppyDisk3Svg} />
  )
  
  export const GearIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={GearSvg} />
  )
  
  export const Gear2Ic = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Gear2Svg} />
  )
  
  export const HeartIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={HeartSvg} />
  )
  
  export const HelpIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={HelpSvg} />
  )
  
  export const HomeIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={HomeSvg} />
  )
  
  export const MailIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={MailSvg} />
  )
  
  export const NightIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={NightSvg} />
  )
  
  export const PencilWriteIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={PencilWriteSvg} />
  )
  
  export const Plane1Ic = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Plane1Svg} />
  )
  
  export const ProfileIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ProfileSvg} />
  )
  
  export const RadioActiveIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={RadioActiveSvg} />
  )
  
  export const RadioInactiveIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={RadioInactiveSvg} />
  )
  
  export const RingingBellIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={RingingBellSvg} />
  )
  
  export const SearchIc = ReactMemoTyped(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={SearchSvg} />
  )
  
  export const Spinner8LinesIc = ReactMemoTyped(function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const Spinner8Lines_ = styled(Spinner8LinesSvg)`
      animation: ${rotation} 3s linear infinite;
    `
    return (props: IconProps) =>
    <SimpleSvgIcon {...props} SvgComponent={Spinner8Lines_} />
  }())
  
  
  
}



