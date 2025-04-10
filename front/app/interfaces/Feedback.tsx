import Council from "./Council";
import { Rank } from "./RankType";

export default interface Feedback {
  id: number;
  rank: Rank;
  council: Council;
}
