class TileWithoutSuit {
  nominal: string;
  isCalled: boolean;
  isFlipped: boolean;

  constructor(nominal : string, isCalled : boolean = false, isFlipped : boolean = false) {
    this.nominal = nominal;
    this.isCalled = isCalled;
    this.isFlipped = isFlipped
  }
}

export class Tile extends TileWithoutSuit {
  suit: string;

  constructor(suit : string, nominal : string, isCalled : boolean = false, isFlipped : boolean = false) {
    super(nominal, isCalled, isFlipped);
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
    return returnArray;
  }

  static parseString(tileString : string) : Tile[] {
    const returnArray : Tile[] = [];
    let flagCalledTile : boolean = false;
    let flagFlippedTile : boolean = false;
    const buffer : TileWithoutSuit[] = [];
    for (const item of tileString) {
      if ((item === 'm') || (item === 'p') || (item === 's') || (item === 'h')) {
        while (true) {
          const bufferItem = buffer.shift();
          if (bufferItem === undefined) break;
          returnArray.push(new Tile(item, bufferItem.nominal, bufferItem.isCalled, bufferItem.isFlipped));
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
        buffer.push(new TileWithoutSuit(item, flagCalledTile, flagFlippedTile));
        flagCalledTile = false;
        flagFlippedTile = false;
      }
    }
    return returnArray;
  }

}