interface Message {
    content: string,
    timestamp: number,
    sender: string,
    receiver: string
    read?:string
}