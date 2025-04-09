import Council from "./Council";
import { Rank } from "./RankType";

export default interface FeedbackClass {
  name: string;
  rank: Rank;
  council: Council;
  strengths: string;
  toImprove: string;
}