export default interface TournamentInformation {
    id: number,
    owner_id: number,
    title: string
    game: string | undefined
    desc: string | undefined
    type: string | undefined
    date_start: Date
}