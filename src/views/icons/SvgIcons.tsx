/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'
import { CastUtils } from 'src/utils/common/CastUtils'
import {ReactUtils} from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem

import { ReactComponent as AddModuleSvg } from 'src/res/icon/add-module.svg'
import { ReactComponent as Arrow1DownSvg } from 'src/res/icon/arrow-1-down.svg'
import { ReactComponent as Arrow2ForwardSvg } from 'src/res/icon/arrow-2-forward.svg'
import { ReactComponent as Arrow3UpRightSvg } from 'src/res/icon/arrow-3-up-right.svg'
import { ReactComponent as Arrow4DownSvg } from 'src/res/icon/arrow-4-down.svg'
import { ReactComponent as Arrow5FwdSvg } from 'src/res/icon/arrow-5-fwd.svg'
import { ReactComponent as Arrow6NextSvg } from 'src/res/icon/arrow-6-next.svg'
import { ReactComponent as ArrowReloadSvg } from 'src/res/icon/arrow-reload.svg'

import { ReactComponent as BrowserSvg } from 'src/res/icon/browser.svg'

import { ReactComponent as CardsHeartSvg } from 'src/res/icon/cards-heart.svg'
import { ReactComponent as CautionSvg } from 'src/res/icon/caution.svg'
import { ReactComponent as ChatRoundSvg } from 'src/res/icon/chat-round.svg'
import { ReactComponent as CheckmarkSvg } from 'src/res/icon/checkmark.svg'
import { ReactComponent as CheckmarkCircleToastifySvg } from 'src/res/icon/checkmark-circle-toastify.svg'
import { ReactComponent as ClearTrashSvg } from 'src/res/icon/clear-trash.svg'
import { ReactComponent as ClipSvg } from 'src/res/icon/clip.svg'
import { ReactComponent as CrossSvg } from 'src/res/icon/cross.svg'
import { ReactComponent as Cross2Svg } from 'src/res/icon/cross-2.svg'

import { ReactComponent as DangerRoundToastifySvg } from 'src/res/icon/danger-round-toastify.svg'
import { ReactComponent as DaySvg } from 'src/res/icon/day.svg'
import { ReactComponent as DayNightSvg } from 'src/res/icon/day-night.svg'
import { ReactComponent as DoubleCheckmarkSvg } from 'src/res/icon/double-checkmark.svg'
import { ReactComponent as Download1Svg } from 'src/res/icon/download-1.svg'
import { ReactComponent as Download2RoundSvg } from 'src/res/icon/download-2-round.svg'

import { ReactComponent as EyeSvg } from 'src/res/icon/eye.svg'
import { ReactComponent as EyeCrossedOutSvg } from 'src/res/icon/eye-crossed-out.svg'

import { ReactComponent as FloppyDisk1Svg } from 'src/res/icon/floppy-disk-1.svg'
import { ReactComponent as FloppyDisk2Svg } from 'src/res/icon/floppy-disk-2.svg'
import { ReactComponent as FloppyDisk3Svg } from 'src/res/icon/floppy-disk-3.svg'

import { ReactComponent as GearSvg } from 'src/res/icon/gear.svg'
import { ReactComponent as Gear2Svg } from 'src/res/icon/gear-2.svg'
import { ReactComponent as GearInSquareSvg } from 'src/res/icon/gear-in-square.svg'
import { ReactComponent as GenderSvg } from 'src/res/icon/gender.svg'
import { ReactComponent as GiftBoxSvg } from 'src/res/icon/gift-box.svg'

import { ReactComponent as HeartSvg } from 'src/res/icon/heart.svg'
import { ReactComponent as HelpSvg } from 'src/res/icon/help.svg'
import { ReactComponent as HomeSvg } from 'src/res/icon/home.svg'

import { ReactComponent as InfoToastifySvg } from 'src/res/icon/info-toastify.svg'

import { ReactComponent as LockSvg } from 'src/res/icon/lock.svg'

import { ReactComponent as MailSvg } from 'src/res/icon/mail.svg'
import { ReactComponent as MoonSvg } from 'src/res/icon/moon.svg'

import { ReactComponent as NameCardSvg } from 'src/res/icon/name-card.svg'
import { ReactComponent as NightSvg } from 'src/res/icon/night.svg'

import { ReactComponent as PencilWriteSvg } from 'src/res/icon/pencil-write.svg'
import { ReactComponent as Plane1Svg } from 'src/res/icon/plane-1.svg'
import { ReactComponent as ProfileSvg } from 'src/res/icon/profile.svg'

import { ReactComponent as RadioActiveSvg } from 'src/res/icon/radio-active.svg'
import { ReactComponent as RadioInactiveSvg } from 'src/res/icon/radio-inactive.svg'
import { ReactComponent as RingingBellSvg } from 'src/res/icon/ringing-bell.svg'

import { ReactComponent as SearchSvg } from 'src/res/icon/search.svg'
import { ReactComponent as Search2Svg } from 'src/res/icon/search-2.svg'
import { ReactComponent as Spinner8LinesSvg } from 'src/res/icon/spinner-8-lines.svg'
import { ReactComponent as SpinnerCircleQuarterSvg } from 'src/res/icon/spinner-circle-quarter.svg'

import { ReactComponent as WarnTriangleToastifySvg } from 'src/res/icon/warn-triangle-toastify.svg'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import PartialUndef = TypeUtils.PartialUndef





export namespace SvgIcons {

  // Base interface for simple svg icons
  
  import falsishToUndef = CastUtils.falsishToUndef
  type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
  type CustomIconProps = PartialUndef<{
    color: string
    accentColor: string
    size: number|string
  }>
  type SvgElement = {
    SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
  }
  
  
  export type SimpleSvgIconProps = CustomIconProps & SvgProps & SvgElement
  
  export const SimpleSvgIcon = Mem(
    (props: SimpleSvgIconProps) => {
      const {
        className,
        color, accentColor,
        size, width, height,
        SvgComponent,
        ...restProps
      } = props
      
      const w = width ?? size
      const h = height ?? size
      
      return <SvgComponent
        css={css`
          width: ${falsishToUndef(!w) && `var(${SvgIcStyle.Prop.size})`};
          height: ${falsishToUndef(!h) && `var(${SvgIcStyle.Prop.size})`};
          max-width: 100%;
          max-height: 100%;
          fill: ${color ?? `var(${SvgIcStyle.Prop.color}, black)`};
          stroke: ${color ?? `var(${SvgIcStyle.Prop.color}, black)`};
          ${SvgIcStyle.Prop.accentColor}:
                  ${accentColor ?? `var(${SvgIcStyle.Prop.accentColor}, gray)`}
        `}
        width={w}
        height={h}
        className={classNames(className,SvgIcStyle.El.iconClassName)}
        {...restProps}
      />
    }
  )
  
  
  
  
  // Icons
  
  export type IconProps = CustomIconProps & SvgProps
  
  
  
  export const AddModuleIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={AddModuleSvg} />
  )
  export const Arrow1DownIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow1DownSvg} />
  )
  
  export const Arrow2ForwardIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow2ForwardSvg} />
  )
  
  export const Arrow3UpRightIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow3UpRightSvg} />
  )
  
  export const Arrow4DownIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow4DownSvg} />
  )
  
  export const Arrow5FwdIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow5FwdSvg} />
  )
  
  export const Arrow6NextIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Arrow6NextSvg} />
  )
  
  export const ArrowReloadIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ArrowReloadSvg} />
  )
  
  export const BrowserIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={BrowserSvg} />
  )
  
  export const CardsHeartIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CardsHeartSvg} />
  )
  
  export const CautionIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CautionSvg} />
  )
  
  export const ChatRoundIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ChatRoundSvg} />
  )
  
  export const CheckmarkIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CheckmarkSvg} />
  )
  
  export const CheckmarkCircleToastifyIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CheckmarkCircleToastifySvg} />
  )
  
  export const ClearTrashIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ClearTrashSvg} />
  )
  
  export const ClipIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ClipSvg} />
  )
  
  export const CrossIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={CrossSvg} />
  )
  
  export const Cross2Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Cross2Svg} />
  )
  
  
  
  export const DangerRoundToastifyIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DangerRoundToastifySvg} />
  )
  
  export const DayIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DaySvg} />
  )
  
  export const DayNightIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DayNightSvg} />
  )
  
  export const DoubleCheckmarkIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={DoubleCheckmarkSvg} />
  )
  
  export const Download1Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Download1Svg} />
  )
  
  export const Download2RoundIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Download2RoundSvg} />
  )
  
  
  
  export const EyeIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={EyeSvg} />
  )
  
  export const EyeCrossedOutIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={EyeCrossedOutSvg} />
  )
  
  
  
  export const FloppyDisk1Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={FloppyDisk1Svg} />
  )
  
  export const FloppyDisk2Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={FloppyDisk2Svg} />
  )
  
  export const FloppyDisk3Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={FloppyDisk3Svg} />
  )
  
  
  
  export const GearIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={GearSvg} />
  )
  
  export const Gear2Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Gear2Svg} />
  )
  
  export const GearInSquareIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={GearInSquareSvg} />
  )
  
  export const GenderIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={GenderSvg} />
  )
  
  export const GiftBoxIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={GiftBoxSvg} />
  )
  
  
  
  export const HeartIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={HeartSvg} />
  )
  
  export const HelpIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={HelpSvg} />
  )
  
  export const HomeIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={HomeSvg} />
  )
  
  
  
  export const InfoToastifyIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={InfoToastifySvg} />
  )
  
  
  
  export const LockIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={LockSvg} />
  )
  
  
  
  export const MailIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={MailSvg} />
  )
  
  export const MoonIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={MoonSvg} />
  )
  
  
  
  export const NameCardIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={NameCardSvg} />
  )
  
  export const NightIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={NightSvg} />
  )
  
  export const PencilWriteIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={PencilWriteSvg} />
  )
  
  export const Plane1Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Plane1Svg} />
  )
  
  export const ProfileIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={ProfileSvg} />
  )
  
  export const RadioActiveIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={RadioActiveSvg} />
  )
  
  export const RadioInactiveIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={RadioInactiveSvg} />
  )
  
  export const RingingBellIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={RingingBellSvg} />
  )
  
  
  
  export const SearchIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={SearchSvg} />
  )
  
  export const Search2Ic = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={Search2Svg} />
  )
  
  export const Spinner8LinesIc = Mem(function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const Spinner8Lines_ = styled(Spinner8LinesSvg)`
      animation: ${rotation} 3s linear infinite;
    `
    return (props: IconProps) =>
    <SimpleSvgIcon {...props} SvgComponent={Spinner8Lines_} />
  }())
  
  export const SpinnerCircleQuarterIc = Mem(function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const SpinnerCircleQuarter_ = styled(SpinnerCircleQuarterSvg)`
      animation: ${rotation} .65s linear infinite;
    `
    return (props: IconProps) =>
    <SimpleSvgIcon {...props} SvgComponent={SpinnerCircleQuarter_} />
  }())
  
  
  
  export const WarnTriangleToastifyIc = Mem(
    (props: IconProps) =>
      <SimpleSvgIcon {...props} SvgComponent={WarnTriangleToastifySvg} />
  )
  
  
  
}



