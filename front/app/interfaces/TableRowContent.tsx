export interface TableRowContent {
  user?: "teacher" | "student" | "class" | "user";
  turmaNome?: string;
  rank?: "excellent" | "good" | "average" | "critical" | "none";
  frequencia?: number;
  className?: string;
  data?: string;
  horario?: string;
}