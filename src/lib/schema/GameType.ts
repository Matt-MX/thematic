export default interface GameType {
    name: string,
    bg?: string,
    icon?: string,
    timings?: {
        name: string,
        time?: number
    }[]
}