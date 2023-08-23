export const BankCode: Record<string, string> = {
  KB: "국민은행",
  SHINHAN: "신한은행",
  NH: "농협은행",
  HANA: "하나은행",
  SC: "제일은행",
  WOORI: "우리은행",
  IBK: "기업은행",
  KDB: "산업은행",
  KFCC: "새마을금고",
  CITI: "씨티은행",
  SUHYUP: "수협은행",
  CU: "신협은행",
  EPOST: "우체국",
  KJBANK: "광주은행",
  JBBANK: "전북은행",
  DGB: "대구은행",
  BUSANBANK: "부산은행",
  KNBANK: "경남은행",
  EJEJUBANK: "제주은행",
  KBANK: "케이뱅크",
};

export const CardCode: Record<string, string> = {
  BC: "비씨카드",
  HANA: "하나SK카드",
  HYUNDAI: "현대카드",
  KB: "KB카드",
  CITI: "씨티카드",
  LOTTE: "롯데카드",
  NH: "농협NH카드",
  SAMSUNG: "삼성카드",
  SHINHAN: "신한카드",
  WOORI: "우리카드",
};

export const UsePurpose: Record<string, string> = {
  BIZ: "사업목적",
  BIZA: "개인사용 사업자회계",
  PERS: "개인사용목적",
};

export const CorpType: Record<string, string> = {
  C: "법인",
  P: "개인",
};

// https://dev.barobill.co.kr/docs/references/계좌조회-API#은행-별-필수항목
export const setBankInput = (code: string): [boolean, boolean, boolean] => {
  switch (code) {
    case "KB":
      return [true, false, false];
    case "SHINHAN":
      return [true, true, false];
    case "NH":
      return [true, true, false];
    case "HANA":
      return [false, false, true];
    case "SC":
      return [false, false, true];
    case "WOORI":
      return [false, false, true];
    case "IBK":
      return [false, false, true];
    case "KDB":
      return [false, false, true];
    case "KFCC":
      return [false, false, true];
    case "CITI":
      return [false, false, true];
    case "SUHYUP":
      return [false, false, true];
    case "CU":
      return [true, true, false];
    case "EPOST":
      return [false, false, true];
    case "KJBANK":
      return [false, false, true];
    case "JBBANK":
      return [false, false, true];
    case "DGB":
      return [true, true, false];
    case "BUSANBANK":
      return [false, false, true];
    case "KNBANK":
      return [false, false, true];
    case "EJEJUBANK":
      return [false, false, true];
    case "KBANK":
      return [true, true, true];
    default:
      return [true, true, true];
  }
};
