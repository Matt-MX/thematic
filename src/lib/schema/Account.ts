import type TournamentInformation from "./TournamentInformation"

export default interface Account {
    id: number
    username: string
    password?: string
    token?: string,

    tournaments?: TournamentInformation[]
}