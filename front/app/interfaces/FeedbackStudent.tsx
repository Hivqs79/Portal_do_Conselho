import Council from "./Council";
import { Rank } from "./RankType";
import Student from "./Student";

export default interface FeedbackStudent {
  content: [
    {
      id: number;
      rank: Rank;
      council: Council;
      strengths: string;
      toImprove: string;
      student: Student;
      frequency: number;
      satisfied: boolean;
    }
  ];
}
