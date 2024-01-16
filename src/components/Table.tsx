import {GrayToken} from "@/utils/theme"
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"
import {styled} from "@mui/material/styles"

export const MyTable = styled(Table)(() => ({
	border: `1px dashed`,
	borderColor: GrayToken[200],
}))
export const MyTableHead = styled(TableHead)(() => ({
	background: `${GrayToken[100]} !important`,
	"th": {
		background: `${GrayToken[50]} !important`,
		fontSize: "12px",
	},
}))
export const MyTableBody = styled(TableBody)(() => ({
	"tr td": {
		background: "#ffffff",
	},
}))
export const MyTableRow = styled(TableRow)(() => ({}))
export const MyTableCell = styled(TableCell)(({theme}) => ({
	position: "sticky",
	left: "0",
	minWidth: "96px !important",
	maxWidth: "256px !important",
	whiteSpace: "nowrap",
	textAlign: "start",
	padding: "16px 14px !important",
	border: "none",
	fontSize: "14px",
	fontFamily: theme.typography.fontWeightMedium as string,
}))
