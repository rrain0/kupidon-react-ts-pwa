import React from 'react'
import {ReactUtils} from "src/utils/ReactUtils";
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import { ReactComponent as Arrow1DownSvg } from 'src/res/icon/arrow-1-down.svg'
import { ReactComponent as Arrow2ForwardSvg } from 'src/res/icon/arrow-2-forward.svg'
import { ReactComponent as Arrow3UpRightSvg } from 'src/res/icon/arrow-3-up-right.svg'
import { ReactComponent as Arrow4DownSvg } from 'src/res/icon/arrow-4-down.svg'
import { ReactComponent as Arrow5FwdSvg } from 'src/res/icon/arrow-5-fwd.svg'
import { ReactComponent as CautionSvg } from 'src/res/icon/caution.svg'
import { ReactComponent as CheckmarkSvg } from 'src/res/icon/checkmark.svg'
import { ReactComponent as ClipSvg } from 'src/res/icon/clip.svg'
import { ReactComponent as Cross2Svg } from 'src/res/icon/cross-2.svg'
import { ReactComponent as DoubleCheckmarkSvg } from 'src/res/icon/double-checkmark.svg'
import { ReactComponent as EyeCrossedOutSvg } from 'src/res/icon/eye-crossed-out.svg'
import { ReactComponent as EyeSvg } from 'src/res/icon/eye.svg'
import { ReactComponent as HeartSvg } from 'src/res/icon/heart.svg'
import { ReactComponent as HomeSvg } from 'src/res/icon/home.svg'
import { ReactComponent as MailSvg } from 'src/res/icon/mail.svg'
import { ReactComponent as PencilWriteSvg } from 'src/res/icon/pencil-write.svg'
import { ReactComponent as Plane1Svg } from 'src/res/icon/plane-1.svg'
import { ReactComponent as ProfileSvg } from 'src/res/icon/profile.svg'
import { ReactComponent as RingingBellSvg } from 'src/res/icon/ringing-bell.svg'
import { ReactComponent as SearchSvg } from 'src/res/icon/search.svg'
import { ReactComponent as Spinner8LinesSvg } from 'src/res/icon/spinner-8-lines.svg'
import styled, {keyframes} from "styled-components";



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
  let SimpleSvgIcon_ = ({ mainColor = 'black', size, SvgComponent, ...props }: SimpleSvgIconProps) => {
    const { style, ...restProps } = props
    return <SvgComponent
      style={{
        width: size, height: size,
        maxWidth: '100%', maxHeight: '100%',
        fill: mainColor, stroke: mainColor,
        ...style
      }}
      {...restProps}
    />
  }
  export const SimpleSvgIcon = ReactMemoTyped(SimpleSvgIcon_)
  
  
  
  
  // Icons
  
  export type IconProps = CustomIconProps & SvgProps
  
  let Arrow1Down_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Arrow1DownSvg} />
  export const Arrow1DownIc = ReactMemoTyped(Arrow1Down_)
  
  let Arrow2Forward_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Arrow2ForwardSvg} />
  export const Arrow2ForwardIc = ReactMemoTyped(Arrow2Forward_)
  
  let Arrow3UpRight_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Arrow3UpRightSvg} />
  export const Arrow3UpRightIc = ReactMemoTyped(Arrow3UpRight_)
  
  let Arrow4Down_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Arrow4DownSvg} />
  export const Arrow4DownIc = ReactMemoTyped(Arrow4Down_)
  
  let Arrow5Fwd_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Arrow5FwdSvg} />
  export const Arrow5FwdIc = ReactMemoTyped(Arrow5Fwd_)
  
  let Caution_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={CautionSvg} />
  export const CautionIc = ReactMemoTyped(Caution_)
  
  let Checkmark_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={CheckmarkSvg} />
  export const CheckmarkIc = ReactMemoTyped(Checkmark_)
  
  let Clip_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={ClipSvg} />
  export const ClipIc = ReactMemoTyped(Clip_)
  
  let Cross2_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Cross2Svg} />
  export const Cross2Ic = ReactMemoTyped(Cross2_)
  
  let DoubleCheckmark_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={DoubleCheckmarkSvg} />
  export const DoubleCheckmarkIc = ReactMemoTyped(DoubleCheckmark_)
  
  let EyeCrossedOut_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={EyeCrossedOutSvg} />
  export const EyeCrossedOutIc = ReactMemoTyped(EyeCrossedOut_)
  
  let Eye_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={EyeSvg} />
  export const EyeIc = ReactMemoTyped(Eye_)
  
  let Heart_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={HeartSvg} />
  export const HeartIc = ReactMemoTyped(Heart_)
  
  let Home_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={HomeSvg} />
  export const HomeIc = ReactMemoTyped(Home_)
  
  let Mail_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={MailSvg} />
  export const MailIc = ReactMemoTyped(Mail_)
  
  let PencilWrite_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={PencilWriteSvg} />
  export const PencilWriteIc = ReactMemoTyped(PencilWrite_)
  
  let Plane1_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Plane1Svg} />
  export const Plane1Ic = ReactMemoTyped(Plane1_)
  
  let Profile_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={ProfileSvg} />
  export const ProfileIc = ReactMemoTyped(Profile_)
  
  let RingingBell_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={RingingBellSvg} />
  export const RingingBellIc = ReactMemoTyped(RingingBell_)
  
  let Search_ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={SearchSvg} />
  export const SearchIc = ReactMemoTyped(Search_)
  
  
  const rotation = keyframes`
    100% { rotate: 1turn }
  `
  const Spinner8Lines_ = styled(Spinner8LinesSvg)`
    animation: ${rotation} 3s linear infinite;
  `
  let Spinner8Lines__ = (props: IconProps) => <SimpleSvgIcon {...props} SvgComponent={Spinner8Lines_} />
  export const Spinner8LinesIc = ReactMemoTyped(Spinner8Lines__)
  
  
  
}



