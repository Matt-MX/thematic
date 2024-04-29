export default interface TournamentInformation {
    id: number,
    owner_id: number,
 
    title: string
    game: string
    desc?: string
    thumb?: string
    type: string
 
    date_start: Date
    date_end?: Date

    currentStatus?: string

    participants: string[]
    helpers: number[]
}