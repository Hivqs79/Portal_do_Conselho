import Class from "./Class";
import { Rank } from "./RankType";

export default interface UserManagement {
  id: number;
  name: string;
  isRepresentant?: boolean;
  lastRank?: Rank;
  lastFrequency?: number;
  userAuthentication: {
    id: number;
    username: string;
    role: string;
  };
  aclass?: Class[];
}