import {useDevice} from "@/utils/hooks"
import React, {PropsWithChildren} from "react"

// export const MobileDevice = (props: PropsWithChildren) => {
// 	const {isMobile} = useDevice()

// 	if (isMobile) {
// 		return props.children
// 	}

// 	return null
// }

// export const MobileAndTabletDevice = (props: PropsWithChildren) => {
// 	const {isMobile, isTablet} = useDevice()

// 	if (isMobile && isTablet) {
// 		return props.children
// 	}

// 	return null
// }

// export const TabletDevice = (props: PropsWithChildren) => {
// 	const {isTablet} = useDevice()

// 	if (isTablet) {
// 		return props.children
// 	}

// 	return null
// }

// export const DesktopAndTabletDevice = (props: PropsWithChildren) => {
// 	const {isTablet, isDesktop} = useDevice()

// 	if (isTablet || isDesktop) {
// 		return props.children
// 	}

// 	return null
// }

// export const DesktopDevice = (props: PropsWithChildren) => {
// 	const {isDesktop} = useDevice()

// 	if (isDesktop) {
// 		return props.children
// 	}

// 	return null
// }

export const MobileDevice: React.FC<PropsWithChildren> = ({children}) => {
	const {isMobile} = useDevice()
	return <React.Fragment>{isMobile && children}</React.Fragment>
}

export const MobileAndTabletDevice: React.FC<PropsWithChildren> = ({children}) => {
	const {isMobile, isTablet} = useDevice()
	return <React.Fragment>{(isMobile || isTablet) && children}</React.Fragment>
}

export const TabletDevice: React.FC<PropsWithChildren> = ({children}) => {
	const {isTablet} = useDevice()
	return <React.Fragment>{isTablet && children}</React.Fragment>
}

export const DesktopAndTabletDevice: React.FC<PropsWithChildren> = ({children}) => {
	const {isTablet, isDesktop, isMobile} = useDevice()
	return <React.Fragment>{(isTablet || isDesktop) && !isMobile && children}</React.Fragment>
}

export const DesktopDevice: React.FC<PropsWithChildren> = ({children}) => {
	const {isDesktop} = useDevice()
	return <React.Fragment>{isDesktop && children}</React.Fragment>
}
