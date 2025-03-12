import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { TableContent } from "@/interfaces/TableContent";
import { Box, Typography } from "@mui/material";

const tableContent: TableContent = {
  headers: [
	{
	  name: "Turma",
	  key: "turmaNome",
	},
	{
	  name: "Data",
	  key: "data",
	}
  ],
  rows: [
	{
	  turmaNome: "Turma A",
	  data: "10/03/2025",	  	             
	},
	{
	  turmaNome: "Turma B",
	  data: "11/03/2025",	  	        
	},
	{
	  turmaNome: "Turma C",
	  data: "12/03/2025",	  	           
	},
	{
	  turmaNome: "Turma A",
	  data: "10/03/2025",	  	             
	},
	{
	  turmaNome: "Turma B",
	  data: "11/03/2025",	  	            
	},
	{
	  turmaNome: "Turma C",
	  data: "12/03/2025",	  	           
	},
  ],
};


export default function Home() {
	const rowButtons: TableRowButtons = {
		visualizeIconButton: true,
	}
	const headerButtons: TableHeaderButtons = {
		searchInput: true,
		orderButton: true,
		filterButton: true		
	}

	return (
		<Box>
			<Title isWelcomeMensage={true}/>
			<Box  className="!mb-6">
				<Typography variant="h6_title">Últimos feedbacks</Typography>
			</Box>
			<Table content={tableContent} headerButtons={headerButtons} rowButtons={rowButtons} />
			<PaginationTable />
		</Box>
  	);
}


