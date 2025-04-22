import Council from "../council/Council";
import { Rank } from "../RankType";
import { Teacher } from "../users/Teacher";

export default interface Annotation {
  id: number;
  rank: Rank;
  strengths: string;
  toImprove: string;
  council: Council;
  teacher: Teacher;
}
