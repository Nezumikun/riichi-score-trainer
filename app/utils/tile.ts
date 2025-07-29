export class Tile {
  suit: string;
  nominal: string;
  isCalled: boolean;

  constructor(suit: string, nominal: string, isCalled: boolean) {
    this.suit = suit;
    this.nominal = nominal;
    this.isCalled = isCalled;
  }

  getImageName() : string {
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
    const buffer : [string, boolean][] = [];
    for (const item of tileString) {
      if ((item === 'm') || (item === 'p') || (item === 's') || (item === 'h')) {
        while (true) {
          const bufferItem = buffer.shift();
          if (bufferItem === undefined) break;
          returnArray.push(new Tile(item, bufferItem[0], bufferItem[1]));
        }
        continue;
      }
      if (flagCalledTile) {
        buffer.push([item, true]);
        flagCalledTile = false;
        continue;
      } else {
        flagCalledTile = (item === 'c');
        if (flagCalledTile) continue;
        buffer.push([item, false]);
      }
    }
    return returnArray;
  }

}