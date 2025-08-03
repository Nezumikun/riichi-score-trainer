class TileWithoutSuit {
  nominal : string;
  isCalled : boolean;
  isFlipped : boolean;
  isPromoted : boolean;

  constructor(nominal : string, isCalled : boolean = false, isFlipped : boolean = false, isPromoted : boolean = false) {
    this.nominal = nominal;
    this.isCalled = isCalled;
    this.isFlipped = isFlipped;
    this.isPromoted = isPromoted;
  }
}

export class Tile extends TileWithoutSuit {
  suit: string;

  constructor(suit : string, nominal : string, isCalled : boolean = false, isFlipped : boolean = false, isPromoted : boolean = false) {
    super(nominal, isCalled, isFlipped, isPromoted);
    this.suit = suit;
  }

  getImageName() : string {
    if (this.isFlipped) {
      return "/tiles/Back.svg"
    }
    if (this.suit !== 'h') {
      const suitName = (this.suit === 's') ? 'Sou' : (this.suit === 'm') ? 'Man' : 'Pin'
      const number = (this.nominal === '0') ? '5' : this.nominal
      const dora = (this.nominal === '0') ? '-Dora' : ''
      return "/tiles/" + suitName + number + dora + '.svg'
    } else {
      const mapHonor = [
        "",
        "Ton", // East
        "Nan", // South
        "Shaa", // West
        "Pei", // North
        "Haku",
        "Hatsu",
        "Chun",
      ];
      return "/tiles/" + mapHonor[parseInt(this.nominal)] + '.svg'
    }
  }

  getCssClasses() : string[] {
    const returnArray : string[] = [ 'tile' ];
    if (this.isCalled) {
      returnArray.push("tile-called");
    }
    if (this.isPromoted) {
      returnArray.push("tile-promoted");
    }
    return returnArray;
  }

  static parseString(tileString : string) : Tile[] {
    const returnArray : Tile[] = [];
    let flagCalledTile : boolean = false;
    let flagFlippedTile : boolean = false;
    let flagPromotedTile : boolean = false;
    const buffer : TileWithoutSuit[] = [];
    for (const item of tileString) {
      if ((item === 'm') || (item === 'p') || (item === 's') || (item === 'h')) {
        while (true) {
          const bufferItem = buffer.shift();
          if (bufferItem === undefined) break;
          returnArray.push(new Tile(item, bufferItem.nominal, bufferItem.isCalled, bufferItem.isFlipped, bufferItem.isPromoted));
        }
        continue;
      }
      else if (item === 'c') {
        flagCalledTile = true;
      }
      else if (item === 'f') {
        flagFlippedTile = true;
      }
      else {
        buffer.push(new TileWithoutSuit(item, flagCalledTile, flagFlippedTile, (flagCalledTile) ? flagPromotedTile : false));
        if (flagCalledTile) flagPromotedTile = true;
        flagCalledTile = false;
        flagFlippedTile = false;
      }
    }
    console.log(returnArray)
    return returnArray;
  }

  static parseWindOfRound(wind : string) : Tile {
    const tileString : string = (wind === 'EAST') ? '1h' : (wind === 'SOUTH') ? '2h' : (wind === 'WEST') ? '3h' : '4h'
    return Tile.parseString(tileString)[0]!
  }

}