// import { Button } from "@mui/material";

import { Box } from "@mui/material";
import TableRow from "./TableRow";
import { useThemeContext } from "@/hooks/useTheme";
import { TableRowProps } from "@/interfaces/TableRowProps";
import TableHeader from "./TableHeader";

interface TableProps {
  variant: "primary" | "secondary";
}

export default function Table({ variant }: TableProps) {
  const { primaryColor } = useThemeContext();

  const tableRows: TableRowProps[] = [
    { variant: "primary", user: "class", rank: "otimo" },
    { variant: "primary", user: "class", rank: "bom" },
    { variant: "primary", user: "class", rank: "mediano" },
    { variant: "primary", user: "class", rank: "critico" },
    { variant: "primary", user: "class", rank: "bom" },
    { variant: "primary", user: "class", rank: "critico" },
    { variant: "primary", user: "class", rank: "bom" },
    { variant: "primary", user: "class", rank: "bom" },
    { variant: "primary", user: "class", rank: "mediano" },
  ];

  if (variant === "primary") {
    return (
      <>
        <div className="w-screen flex justify-center items-center">
          <Box
            style={{ borderColor: primaryColor }}
            className="flex justify-center items-center flex-col border-[1px] overflow-hidden rounded-big max-w-[1024px] mx-10"
          >
            <TableHeader />
            {tableRows.map((row, index) => (
              <TableRow
                key={index}
                variant={row.variant}
                user={row.user}
                rank={row.rank}
                className={`${
                  index === 0
                    ? "border-b-2"
                    : index === tableRows.length - 1
                    ? "rounded-b-big border-b-0"
                    : "border-b-2"
                }`}
              />
            ))}
          </Box>
        </div>
      </>
    );
  }
}
