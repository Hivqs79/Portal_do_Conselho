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
	},
	{
	  name: "Horário",
	  key: "horario",
	},
  ],
  rows: [
	{
	  turmaNome: "Turma A",
	  data: "10/03/2025",
	  horario: "08:00",
	  rank: "excellent",            
	},
	{
	  turmaNome: "Turma B",
	  data: "11/03/2025",
	  horario: "09:30",
	  rank: "good",            
	},
	{
	  turmaNome: "Turma C",
	  data: "12/03/2025",
	  horario: "14:00",
	  rank: "average",            
	},
	{
	  turmaNome: "Turma A",
	  data: "10/03/2025",
	  horario: "08:00",
	  rank: "excellent",            
	},
	{
	  turmaNome: "Turma B",
	  data: "11/03/2025",
	  horario: "09:30",
	  rank: "critical",            
	},
	{
	  turmaNome: "Turma C",
	  data: "12/03/2025",
	  horario: "14:00",
	  rank: "average",            
	},
  ],
};


export default function Home() {
	return (
		<Box>
			<Title isWelcomeMensage={true}/>
			<Box  className="!mb-6">
				<Typography variant="h6_title">Últimos feedbacks</Typography>
			</Box>
			<Table content={tableContent}/>
		</Box>
  	);
}


