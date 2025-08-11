export class TilesInHand {
  hand : Tile[] = [];
  melds : Tile[][] = [];
  winningTile : Tile = new Tile("", "");

  parseTenhouHand(tenhouHand : TenhouHand) : void {
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
  }
}