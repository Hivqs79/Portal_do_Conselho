import PreCouncil from "@/interfaces/pre-council/PreCouncil";
import User from "@/interfaces/users/User";
import Feedback from "./Feedback";

export default interface FeedbackUser extends Feedback { 
    user: User;
    isViewed: boolean;
    isSatisfied: boolean;
    preCouncil: PreCouncil
}