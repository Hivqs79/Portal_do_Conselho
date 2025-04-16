import PreCouncil from "./PreCouncil"

export default interface PreCouncilSection {
    id: number,
    preCouncil: PreCouncil,
    topic: string,
    description: string,
    strengths: string,
    toImprove: string
}