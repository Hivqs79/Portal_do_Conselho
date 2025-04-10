import Council from "./Council";
import { Rank } from "./RankType";
import Student from "./Student";
import { Teacher } from "./Teacher";

export default interface FeedbackStudent {
  id: number;
  rank: Rank;
  strengths: string;
  toImprove: string;
  council: Council;
  teacher: Teacher;
  student: Student;
  frequency: number;
  satisfied: boolean;
}
