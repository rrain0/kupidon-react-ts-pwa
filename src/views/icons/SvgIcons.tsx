/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React from 'react'
import { CastUtils } from 'src/utils/common/CastUtils'

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
import { ReactComponent as PlusSvg } from 'src/res/icon/plus.svg'
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
import falsishToUndef = CastUtils.falsishToUndef
import isPresent = CastUtils.isPresent




export namespace SvgIcons {

  // Base interface for simple svg icons
  
  type BaseSimpleSvgIconCustomProps = PartialUndef<{
    color: string
    accentColor: string
    size: number|string
  }>
  
  type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string }
  type BaseSimpleSvgIconSvgComponentProp = {
    SvgComponent: React.FunctionComponent<SvgProps>
  }
  
  type BaseSimpleSvgIconForwardRefProps = JSX.IntrinsicElements['svg']
  type BaseSimpleSvgIconRefElement = SVGSVGElement
  
  
  export type BaseSimpleSvgIconProps =
    BaseSimpleSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps & BaseSimpleSvgIconSvgComponentProp
  
  export const BaseSimpleSvgIcon =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, BaseSimpleSvgIconProps>(
  (props, forwardedRef) => {
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
        width:  ${falsishToUndef(!isPresent(w)) && `var(${SvgIcStyle.Prop.size})`};
        height: ${falsishToUndef(!isPresent(h)) && `var(${SvgIcStyle.Prop.size})`};
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
      ref={forwardedRef}
    />
  }))
  
  
  
  
  // Icons
  
  export type SvgIcProps = BaseSimpleSvgIconCustomProps & BaseSimpleSvgIconForwardRefProps
  
  
  
  
  export const AddModuleIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={AddModuleSvg} ref={forwardedRef}/>
  ))
  
  export const Arrow1DownIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Arrow1DownSvg} ref={forwardedRef}/>
  ))
  
  export const Arrow2ForwardIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Arrow2ForwardSvg} ref={forwardedRef} />
  ))
  
  export const Arrow3UpRightIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Arrow3UpRightSvg} ref={forwardedRef} />
  ))
  
  export const Arrow4DownIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Arrow4DownSvg} ref={forwardedRef} />
  ))
  
  export const Arrow5FwdIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Arrow5FwdSvg} ref={forwardedRef} />
  ))
  
  export const Arrow6NextIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Arrow6NextSvg} ref={forwardedRef} />
  ))
  
  export const ArrowReloadIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={ArrowReloadSvg} ref={forwardedRef} />
  ))
  
  export const BrowserIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={BrowserSvg} ref={forwardedRef} />
  ))
  
  export const CardsHeartIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={CardsHeartSvg} ref={forwardedRef} />
  ))
  
  export const CautionIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={CautionSvg} ref={forwardedRef} />
  ))
  
  export const ChatRoundIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={ChatRoundSvg} ref={forwardedRef} />
  ))
  
  export const CheckmarkIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={CheckmarkSvg} ref={forwardedRef} />
  ))
  
  export const CheckmarkCircleToastifyIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={CheckmarkCircleToastifySvg} ref={forwardedRef} />
  ))
  
  export const ClearTrashIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={ClearTrashSvg} ref={forwardedRef} />
  ))
  
  export const ClipIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={ClipSvg} ref={forwardedRef} />
  ))
  
  export const CrossIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={CrossSvg} ref={forwardedRef} />
  ))
  
  export const Cross2Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Cross2Svg} ref={forwardedRef} />
  ))
  
  
  
  export const DangerRoundToastifyIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={DangerRoundToastifySvg} ref={forwardedRef} />
  ))
  
  export const DayIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={DaySvg} ref={forwardedRef} />
  ))
  
  export const DayNightIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={DayNightSvg} ref={forwardedRef} />
  ))
  
  export const DoubleCheckmarkIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={DoubleCheckmarkSvg} ref={forwardedRef} />
  ))
  
  export const Download1Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Download1Svg} ref={forwardedRef} />
  ))
  
  export const Download2RoundIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Download2RoundSvg} ref={forwardedRef} />
  ))
  
  
  
  export const EyeIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={EyeSvg} ref={forwardedRef} />
  ))
  
  export const EyeCrossedOutIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={EyeCrossedOutSvg} ref={forwardedRef} />
  ))
  
  
  
  export const FloppyDisk1Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={FloppyDisk1Svg} ref={forwardedRef} />
  ))
  
  export const FloppyDisk2Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={FloppyDisk2Svg} ref={forwardedRef} />
  ))
  
  export const FloppyDisk3Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={FloppyDisk3Svg} ref={forwardedRef} />
  ))
  
  
  
  export const GearIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={GearSvg} ref={forwardedRef} />
  ))
  
  export const Gear2Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Gear2Svg} ref={forwardedRef} />
  ))
  
  export const GearInSquareIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={GearInSquareSvg} ref={forwardedRef} />
  ))
  
  export const GenderIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={GenderSvg} ref={forwardedRef} />
  ))
  
  export const GiftBoxIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={GiftBoxSvg} ref={forwardedRef} />
  ))
  
  
  
  export const HeartIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={HeartSvg} ref={forwardedRef} />
  ))
  
  export const HelpIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={HelpSvg} ref={forwardedRef} />
  ))
  
  export const HomeIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={HomeSvg} ref={forwardedRef} />
  ))
  
  
  
  export const InfoToastifyIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={InfoToastifySvg} ref={forwardedRef} />
  ))
  
  
  
  export const LockIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={LockSvg} ref={forwardedRef} />
  ))
  
  
  
  export const MailIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={MailSvg} ref={forwardedRef} />
  ))
  
  export const MoonIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={MoonSvg} ref={forwardedRef} />
  ))
  
  
  
  export const NameCardIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={NameCardSvg} ref={forwardedRef} />
  ))
  
  export const NightIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={NightSvg} ref={forwardedRef} />
  ))
  
  
  
  export const PencilWriteIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={PencilWriteSvg} ref={forwardedRef} />
  ))
  
  export const Plane1Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Plane1Svg} ref={forwardedRef} />
  ))
  
  export const PlusIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={PlusSvg} ref={forwardedRef} />
  ))
  
  export const ProfileIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={ProfileSvg} ref={forwardedRef} />
  ))
  
  export const RadioActiveIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={RadioActiveSvg} ref={forwardedRef} />
  ))
  
  export const RadioInactiveIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={RadioInactiveSvg} ref={forwardedRef} />
  ))
  
  export const RingingBellIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={RingingBellSvg} ref={forwardedRef} />
  ))
  
  
  
  export const SearchIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={SearchSvg} ref={forwardedRef} />
  ))
  
  export const Search2Ic =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={Search2Svg} ref={forwardedRef} />
  ))
  
  export const Spinner8LinesIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const Spinner8Lines_ = styled(Spinner8LinesSvg)`
      animation: ${rotation} 3s linear infinite;
    `
    return (props, forwardedRef) =>
      <BaseSimpleSvgIcon {...props} SvgComponent={Spinner8Lines_} ref={forwardedRef} />
  }()
  ))
  
  export const SpinnerCircleQuarterIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  function(){
    const rotation = keyframes`
      100% { rotate: 1turn }
    `
    const SpinnerCircleQuarter_ = styled(SpinnerCircleQuarterSvg)`
      animation: ${rotation} .65s linear infinite;
    `
    return (props, forwardedRef) =>
      <BaseSimpleSvgIcon {...props} SvgComponent={SpinnerCircleQuarter_} ref={forwardedRef} />
  }()
  ))
  
  
  
  export const WarnTriangleToastifyIc =
  React.memo(
  React.forwardRef<BaseSimpleSvgIconRefElement, SvgIcProps>(
  (props, forwardedRef) =>
    <BaseSimpleSvgIcon {...props} SvgComponent={WarnTriangleToastifySvg} ref={forwardedRef} />
  ))
  
  
  
}



