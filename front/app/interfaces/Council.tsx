import Class from "./Class"
import { Teacher } from "./Teacher"

type CouncilStatus = 'expired' | 'active' | 'scheduled';

export default interface Council {
    id: number,
    startDateTime: Date,
    teachers: Teacher[],
    aclass: Class,    
    status?: CouncilStatus,
}