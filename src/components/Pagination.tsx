import {GrayToken, PrimaryToken} from "@/utils/theme"
import {Pagination, PaginationItem, PaginationProps} from "@mui/material"
import {styled} from "@mui/material/styles"

interface Props extends PaginationProps {
	page: number
	counter: number
	pageSize: number
	handleChange: (event: React.ChangeEvent<unknown>, value: number) => void
	className?: string
}

const PaginationStyled = styled(Pagination)(({theme}) => ({
	"& .Mui-selected": {
		background: theme.palette.mode === "light" ? `${GrayToken[100]} !important` : `${PrimaryToken[400]} !important`,
		color: `${GrayToken[900]} !important`,
	},

	"& .MuiPaginationItem-root": {
		borderRadius: "4px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "0px",
		border: `1px solid ${theme.palette.mode === "light" ? GrayToken[200] : GrayToken[800]} !important`,
		color: GrayToken[400],
	},

	"& .MuiPaginationItem-root:hover": {
		color: theme.palette.mode === "light" ? GrayToken[900] : GrayToken[50],
	},

	"& .MuiPaginationItem-ellipsis": {
		border: "none !important",
	},
}))

export function MyPagination({page, counter, pageSize, handleChange, className, ...props}: Props) {
	return (
		<PaginationStyled
			count={Math.ceil(counter / pageSize)}
			page={page}
			onChange={handleChange}
			shape="rounded"
			className={className}
			renderItem={({...params}) => <PaginationItem {...params} />}
			{...props}
		/>
	)
}
