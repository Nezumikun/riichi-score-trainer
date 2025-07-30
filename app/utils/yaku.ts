export class Yaku {
    name : string;
    price : number;

    constructor (nameOrIndex : string | number, price : number) {
        if (typeof nameOrIndex === 'number') {
            this.name = Yaku.getYakuName(nameOrIndex)
        } else {
            this.name = nameOrIndex;
        }
        this.price = price;
    }

    static getYakuName(yakuIndex : number) : string {
        const yakuList : string[] = [
            "Tsumo",
            "Riichi",
            "Ippatsu",
            "Chankan",
            "Rinshan",
            "Haitei",
            "Houtei",
            "Pinfu",
            "Tanyao",
            "Ippeiko",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Yakuhai",
            "Daburu Riichi",
            "Chiitoi",
            "Chanta",
            "Itsuu",
            "Sanshoku Doujun",
            "Sanshoku Doukou",
            "Sankantsu",
            "Toitoi",
            "Sanankou",
            "Shousangen",
            "Honrouto",
            "Ryanpeikou",
            "Junchan",
            "Honitsu",
            "Chinitsu",
            "Renhou",
            "Tenhou",
            "Chihou",
            "Daisangen",
            "Suuankou",
            "Suuankou",
            "Tsuiisou",
            "Ryuuiisou",
            "Chinrouto",
            "Chuuren poutou",
            "Chuuren poutou (Nine tile wait)",
            "Kokushi musou",
            "Kokushi musou (13 tile wait)",
            "Daisuushi",
            "Shousuushi",
            "Suukantsu",
            "Dora",
            "Uradora",
            "Akadora",
        ];
        return yakuList[yakuIndex] || ''
    }
}