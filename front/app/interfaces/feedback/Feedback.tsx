import Council from "@/interfaces/council/Council";
import { Rank } from "@/interfaces/RankType";

export default interface Feedback {
  id: number;
  rank: Rank;
  council: Council;  
  strengths: string;
  toImprove: string;
}
