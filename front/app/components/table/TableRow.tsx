interface TableProps {
  variant: "primary" | "secondary";
  user: string;
  rank?: React.ReactNode;
  frequencia?: number;
}

export default function TableRow({
  variant,
  user,
  rank,
  frequencia,
}: TableProps) {
  return (
    <>
      <div>
        <p>{user}</p>
        <p>{frequencia}</p>
        {rank}
      </div>
    </>
  );
}
