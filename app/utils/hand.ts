export class Hand {
    GUID : string = "";
    tiles: TilesInHand = new TilesInHand();
    winningParameters : WinningParameters = new WinningParameters();
    winningDetails : WinningDetails = new WinningDetails();

    parseTehnouHandRequest(tenhouHandRequest : TenhouHandRequest) : void {
        const tenhouHand : TenhouHand = tenhouHandRequest.tenhouHand
        this.GUID = tenhouHandRequest.fileName.replace('.json', '')
        this.tiles.parseTenhouHand(tenhouHand)
        this.winningParameters.parseTenhouHand(tenhouHand)
        this.winningDetails.parseTenhouHand(tenhouHand)
    }
}