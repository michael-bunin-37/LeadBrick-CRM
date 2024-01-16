import {GrayToken} from "@/utils/theme"
import {Skeleton, styled} from "@mui/material"

export const MySkeleton = styled(Skeleton)(({theme}) => ({
	background: theme.palette.mode == "dark" ? GrayToken[800] : GrayToken[200],
}))
