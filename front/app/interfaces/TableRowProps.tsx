export interface TableRowProps {
  variant: "primary" | "secondary";
  user: "teacher" | "student" | "class" | "user";
  turmaNome?: string;
  rank?: "otimo" | "bom" | "mediano" | "critico";
  frequencia?: number;
  className?: string;
}