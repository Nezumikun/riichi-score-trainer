export interface TenhouHand {
    hand : string,
    melds : string[],
    winningTile : string,
    roundWind : string,
    seatWind : string,
    doraIndicators : string[],
    uraDoraIndicators : string[],
    isRiichi : boolean,
    isTsumo : boolean,
    han : number,
    fu : string,
    fu_details : FuDetail[],
    yakusAchieved : object,
    isDealer : boolean,
    honbaSticks: number
}