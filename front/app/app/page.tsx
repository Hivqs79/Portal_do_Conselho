import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { Box, Typography } from "@mui/material";

export default function Home() {
	return (
		<Box>
			<Title isWelcomeMensage={true}/>
			<Typography variant="h6_title">Últimos feedbacks</Typography>
			<Table variant={"primary"} />
		</Box>
  	);
}


