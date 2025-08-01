export class Hand {
    GUID : string = "";
    hand : Tile[] = [];
    melds : Tile[][] = [];
    winningTile : Tile = new Tile("", "");
    roundWind : Tile = new Tile("", "");
    seatWind : Tile = new Tile("", "");
    doraIndicators : Tile[] = [];
    uraDoraIndicators : Tile[] = [];
    isRiichi : boolean = false;
    isTsumo : boolean = false;
    han : number = 0;
    fu : number = 0;
    fuDetails : FuDetail[] = [];
    yaku : Yaku[] = [];

    parseTehnouHandRequest(tenhouHandRequest : TenhouHandRequest) : void {
        const tenhouHand : TenhouHand = tenhouHandRequest.tenhouHand
        this.GUID = tenhouHandRequest.fileName.replace('.json', '');
        this.hand = Tile.parseString(tenhouHand.hand)
        this.winningTile = Tile.parseString(tenhouHand.winningTile)[0]!;
        const winningIndex = this.hand.findLastIndex(
            item => (
                (item.suit === this.winningTile.suit) && (item.nominal === this.winningTile.nominal)
            )
        )
        if (winningIndex > -1) {
            this.hand.splice(winningIndex, 1);
        }
        this.melds = []
        for (const meld of tenhouHand.melds) {
            this.melds.push(Tile.parseString(meld));
        }
        this.roundWind = Tile.parseWindOfRound(tenhouHand.roundWind)
        this.seatWind = Tile.parseString(tenhouHand.seatWind)[0]!
        this.doraIndicators = []
        for (const doraIndicator of tenhouHand.doraIndicators) {
            this.doraIndicators.push(Tile.parseString(doraIndicator)[0]!);
        }
        this.uraDoraIndicators = []
        for (const uraDoraIndicator of tenhouHand.uraDoraIndicators) {
            this.uraDoraIndicators.push(Tile.parseString(uraDoraIndicator)[0]!);
        }
        this.isRiichi = tenhouHand.isRiichi
        this.isTsumo = tenhouHand.isTsumo
        this.han = tenhouHand.han
        this.fu = parseInt(tenhouHand.fu)
        this.fuDetails = []
        for (const fuDetail of tenhouHand.fu_details) {
            if (fuDetail.reason === 'rounding') continue;
            this.fuDetails.push(fuDetail);
        }
        this.yaku = []
        for (const [key, value] of Object.entries(tenhouHand.yakusAchieved)) {
            const price = parseInt(value);
            if (price === 0) continue;
            this.yaku.push(new Yaku(parseInt(key), price));
        }
        // console.log(this)
    }
}