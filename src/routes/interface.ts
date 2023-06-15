export interface ICommon {
  Message: string;
  Type: number;
  HasWarning: boolean;
  RateLimit: object;
}

export interface IData {
  CoinInfo: {
    Id: string;
    Name: string;
    FullName: string;
    Internal: string;
    ImageUrl: string;
    Url: string;
    Algorithm: string;
    ProofType: string;
    Rating: {
      Weiss: {
        Rating: string;
        TechnologyAdoptionRating: string;
        MarketPerformanceRating: string;
      };
    };
    NetHashesPerSecond: number;
    BlockNumber: number;
    BlockTime: number;
    BlockReward: number;
    AssetLaunchDate: string;
    MaxSupply: number;
    Type: number;
    DocumentType: string;
  };
  RAW: {
    USD: {
      TYPE: string;
      MARKET: string;
      FROMSYMBOL: string;
      TOSYMBOL: string;
      FLAGS: string;
      PRICE: number;
      LASTUPDATE: number;
      MEDIAN: number;
      LASTVOLUME: number;
      LASTVOLUMETO: number;
      LASTTRADEID: string;
      VOLUMEDAY: number;
      VOLUMEDAYTO: number;
      VOLUME24HOUR: number;
      VOLUME24HOURTO: number;
      OPENDAY: number;
      HIGHDAY: number;
      LOWDAY: number;
      OPEN24HOUR: number;
      HIGH24HOUR: number;
      LOW24HOUR: number;
      LASTMARKET: string;
      VOLUMEHOUR: number;
      VOLUMEHOURTO: number;
      OPENHOUR: number;
      HIGHHOUR: number;
      LOWHOUR: number;
      TOPTIERVOLUME24HOUR: number;
      TOPTIERVOLUME24HOURTO: number;
      CHANGE24HOUR: number;
      CHANGEPCT24HOUR: number;
      CHANGEDAY: number;
      CHANGEPCTDAY: number;
      CHANGEHOUR: number;
      CHANGEPCTHOUR: number;
      CONVERSIONTYPE: string;
      CONVERSIONSYMBOL: string;
      CONVERSIONLASTUPDATE: number;
      SUPPLY: number;
      MKTCAP: number;
      MKTCAPPENALTY: number;
      CIRCULATINGSUPPLY: number;
      CIRCULATINGSUPPLYMKTCAP: number;
      TOTALVOLUME24H: number;
      TOTALVOLUME24HTO: number;
      TOTALTOPTIERVOLUME24H: number;
      TOTALTOPTIERVOLUME24HTO: number;
      IMAGEURL: string;
    };
  };
}

export interface ICoin extends ICommon {
  MetaData: object;
  SponsoredData: [];
  Data: IData[];
}

export interface ICoinInfo extends ICommon {
  Response: string;
  Data: {
    [key: string]: ICoinData;
  };
}

export interface ICoinData {
  Id: string;
  Url: string;
  ImageUrl: string;
  ContentCreatedOn: number;
  Name: string;
  Symbol: string;
  CoinName: string;
  FullName: string;
  Description: string;
  AssetTokenStatus: string;
  Algorithm: string;
  ProofType: string;
  SortOrder: string;
  Sponsored: boolean;
  Taxonomy: object;
  Rating: object;
  IsTrading: boolean;
  TotalCoinsMined: number;
  CirculatingSupply: number;
  BlockNumber: number;
  NetHashesPerSecond: number;
  BlockReward: number;
  BlockTime: number;
  AssetLaunchDate: string;
  AssetWhitepaperUrl: string;
  AssetWebsiteUrl: string;
  MaxSupply: number;
  MktCapPenalty: number;
  IsUsedInDefi: number;
  IsUsedInNft: number;
  PlatformType: string;
  DecimalPoints: number;
  AlgorithmType: string;
  Difficulty: number;
}

export interface IPriceInfo {
  DISPLAY: {
    [key: string]: {
      USD: IPriceData;
    };
  };
  RAW: {
    [key: string]: {
      USD: IPriceData;
    };
  };
}

export interface IPriceData {
  TYPE: string;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: string;
  PRICE: number;
  LASTUPDATE: number;
  MEDIAN: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  LASTTRADEID: string;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  OPENDAY: number;
  HIGHDAY: number;
  LOWDAY: number;
  OPEN24HOUR: number;
  HIGH24HOUR: number;
  LOW24HOUR: number;
  LASTMARKET: string;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  OPENHOUR: number;
  HIGHHOUR: number;
  LOWHOUR: number;
  TOPTIERVOLUME24HOUR: number;
  TOPTIERVOLUME24HOURTO: number;
  CHANGE24HOUR: number;
  CHANGEPCT24HOUR: number;
  CHANGEDAY: number;
  CHANGEPCTDAY: number;
  CHANGEHOUR: number;
  CHANGEPCTHOUR: number;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  CONVERSIONLASTUPDATE: number;
  SUPPLY: number;
  MKTCAP: number;
  MKTCAPPENALTY: number;
  CIRCULATINGSUPPLY: number;
  CIRCULATINGSUPPLYMKTCAP: number;
  TOTALVOLUME24H: number;
  TOTALVOLUME24HTO: number;
  TOTALTOPTIERVOLUME24H: number;
  TOTALTOPTIERVOLUME24HTO: number;
  IMAGEURL: string;
}

export interface IHistorical extends ICommon {
  Response: string;
  Data: {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: IHistoricalData[];
  };
}

export interface IHistoricalData {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

export interface IOrderBook extends ICommon {
  Response: string;
  Data: {
    TYPE: string;
    CCSEQ: number;
    M: string;
    FSYM: string;
    TSYM: string;
    BID: [
      {
        P: number;
        Q: number;
      }
    ];
    ASK: [
      {
        P: number;
        Q: number;
      }
    ];
  };
}
