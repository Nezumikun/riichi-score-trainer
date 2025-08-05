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
    isDealer : boolean = false;
    LimitHand : 'mangan' | 'haneman' | 'baiman' | 'sanbaiman' | 'yakuman' | false = false;

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
        this.isDealer = tenhouHand.isDealer
        if (this.han >= 13) this.LimitHand = 'yakuman'
        else if (this.han >= 11) this.LimitHand =  'sanbaiman'
        else if (this.han >= 8) this.LimitHand =  'baiman'
        else if (this.han >= 6) this.LimitHand = 'haneman'
        else if ((this.han >= 5) || ((this.han === 4) && (this.fu >= 40)) || ((this.han === 3) && (this.fu >= 70))) this.LimitHand =  'mangan'
        else this.LimitHand = false
    }

    private getPoints(k : number, bazoro : number = 2) : number {
        const base = this.fu * Math.pow(2, this.han + bazoro);
        const points = Math.ceil(base * k / 100) * 100;
        return points;
    }

    getHandPoints() : HandPoints {
        const result : HandPoints = { fromNonDealer: 0, fromDealer: 0 };
        if (this.isDealer) {
            if (this.isTsumo) {
                switch (this.LimitHand) {
                    case 'yakuman':
                        result.fromNonDealer = 16000;
                        break;
                    case 'sanbaiman':
                        result.fromNonDealer = 12000;
                        break;
                    case 'baiman':
                        result.fromNonDealer = 8000;
                        break;
                    case 'haneman':
                        result.fromNonDealer = 6000;
                        break;
                    case 'mangan':
                        result.fromNonDealer = 4000;
                        break;
                    default:
                        result.fromNonDealer = this.getPoints(2);
                }
            } else {
                switch (this.LimitHand) {
                    case 'yakuman':
                        result.fromNonDealer = 48000;
                        break;
                    case 'sanbaiman':
                        result.fromNonDealer = 36000;
                        break;
                    case 'baiman':
                        result.fromNonDealer = 24000;
                        break;
                    case 'haneman':
                        result.fromNonDealer = 18000;
                        break;
                    case 'mangan':
                        result.fromNonDealer = 12000;
                        break;
                    default:
                        result.fromNonDealer = this.getPoints(6);
                }
            }
        } else {
            if (this.isTsumo) {
                switch (this.LimitHand) {
                    case 'yakuman':
                        result.fromDealer = 16000;
                        result.fromNonDealer = 8000;
                        break;
                    case 'sanbaiman':
                        result.fromDealer = 12000;
                        result.fromNonDealer = 6000;
                        break;
                    case 'baiman':
                        result.fromDealer = 8000;
                        result.fromNonDealer = 4000;
                        break;
                    case 'haneman':
                        result.fromDealer = 6000;
                        result.fromNonDealer = 3000;
                        break;
                    case 'mangan':
                        result.fromDealer = 4000;
                        result.fromNonDealer = 2000;
                        break;
                    default:
                        result.fromDealer = this.getPoints(2);
                        result.fromNonDealer = this.getPoints(1);
                }
            } else {
                switch (this.LimitHand) {
                    case 'yakuman':
                        result.fromDealer = result.fromNonDealer = 32000;
                        break;
                    case 'sanbaiman':
                        result.fromDealer = result.fromNonDealer = 24000;
                        break;
                    case 'baiman':
                        result.fromDealer = result.fromNonDealer = 16000;
                        break;
                    case 'haneman':
                        result.fromDealer = result.fromNonDealer = 12000;
                        break;
                    case 'mangan':
                        result.fromDealer = result.fromNonDealer = 8000;
                        break;
                    default:
                        result.fromDealer = result.fromNonDealer = this.getPoints(4);
                }
            }
        }
        return result;
    }
}