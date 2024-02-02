import {GrayToken} from "@/utils/theme"
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"
import {styled} from "@mui/material/styles"

export const MyTable = styled(Table)(() => ({
	// border: `1px dashed`,
	// borderColor: GrayToken[200],
}))
export const MyTableHead = styled(TableHead)(() => ({
	background: `${GrayToken[50]} !important`,
	// background: "#ffffff",
	// borderBottom: `1px solid`,
	// borderColor: GrayToken[400],

	"th": {
		background: `${GrayToken[50]} !important`,
		// background: "#ffffff",
		fontSize: "12px",
	},
}))
export const MyTableBody = styled(TableBody)(() => ({
	"tr td": {
		background: "#ffffff",
	},

	"tr:nth-child(2n) td": {
		background: GrayToken[50],
	},
}))
export const MyTableRow = styled(TableRow)(() => ({}))
export const MyTableCell = styled(TableCell)(({theme}) => ({
	position: "sticky",
	left: "0",
	minWidth: "56px !important",
	maxWidth: "256px !important",
	whiteSpace: "nowrap",
	padding: "16px 14px !important",
	border: "none",
	fontSize: "14px",
	fontFamily: theme.typography.fontWeightMedium as string,
}))
