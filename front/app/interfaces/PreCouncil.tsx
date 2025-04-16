import Council from "./Council"
import { Teacher } from "./Teacher"

export default interface PreCouncil {
    id: number,
    council: Council,
    teachers: Teacher[]
};