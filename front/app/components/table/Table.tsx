import { Button } from "@mui/material";
import TableRow from "./TableRow";
import { FaRegFaceFrown, FaRegFaceLaugh, FaRegFaceMeh, FaRegFaceSmile } from "react-icons/fa6";

export default function Table() {
  const rank = {
    otimo: <FaRegFaceLaugh className="text-2xl"/>,
    bom: <FaRegFaceSmile className="text-2xl"/>,
    mediano: <FaRegFaceMeh className="text-2xl"/>,
    critico: <FaRegFaceFrown className="text-2xl"/>,
  };

  return (
    <>
      <div>
        {/* <Button variant="contained" color="primary" sx={{ width: 200 }}>
          Testando MUI
        </Button> */}
        {/* <TableRow variant="primary" user="Aluno 1" rank={rank.critico} /> */}
        
      </div>
    </>
  );
}
