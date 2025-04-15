export default interface NotificationType {
    id: number,
    userId: number,
    title: string ,
    message: string ,
    messageDateTime: Date, 
    viewed: boolean,
}