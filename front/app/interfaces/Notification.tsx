export default interface Notification {
    id: number,
    userId: number,
    title: string ,
    message: string ,
    messageDateTime: Date, 
    viewed: boolean,
}