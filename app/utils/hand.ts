export class Hand {
    GUID : string = "";
    hand: TilesInHand = new TilesInHand();
    roundWind : Tile = new Tile("", "");
    seatWind : Tile = new Tile("", "");
    doraIndicators : Tile[] = [];
    uraDoraIndicators : Tile[] = [];
    isRiichi : boolean = false;
    isTsumo : boolean = false;
    winningDetails : WinningDetails = new WinningDetails();

    parseTehnouHandRequest(tenhouHandRequest : TenhouHandRequest) : void {
        const tenhouHand : TenhouHand = tenhouHandRequest.tenhouHand
        this.GUID = tenhouHandRequest.fileName.replace('.json', '')
        this.hand.parseTenhouHand(tenhouHand)
        this.roundWind = Tile.parseWindOfRound(tenhouHand.roundWind)
        this.seatWind = Tile.parseString(tenhouHand.seatWind)[0]!
        this.doraIndicators = []
        for (const doraIndicator of tenhouHand.doraIndicators) {
            this.doraIndicators.push(Tile.parseString(doraIndicator)[0]!)
        }
        this.uraDoraIndicators = []
        for (const uraDoraIndicator of tenhouHand.uraDoraIndicators) {
            this.uraDoraIndicators.push(Tile.parseString(uraDoraIndicator)[0]!)
        }
        this.isRiichi = tenhouHand.isRiichi
        this.isTsumo = tenhouHand.isTsumo
        this.winningDetails.parseTenhouHand(tenhouHand)
    }
}