export const BaroBankCode: Record<string, string> = {
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

export const BankCorpCode: Record<string, string> = {
  "039": "경남은행",
  "034": "광주은행",
  "012": "단위농협",
  "032": "부산은행",
  "045": "새마을금고",
  "064": "산림조합",
  "088": "신한은행",
  "048": "신협",
  "027": "씨티은행",
  "020": "우리은행",
  "071": "우체국예금보험",
  "050": "저축은행중앙회",
  "037": "전북은행",
  "035": "제주은행",
  "090": "카카오뱅크",
  "089": "케이뱅크",
  "092": "토스뱅크",
  "081": "하나은행",
  "054": "홍콩상하이은행",
  "003": "IBK기업은행",
  "004": "KB국민은행",
  "031": "DGB대구은행",
  "002": "KDB산업은행",
  "011": "NH농협은행",
  "023": "SC제일은행",
  "007": "Sh수협은행",
};

export const FinItemCode: Record<string, string> = {
  CHKACC: "자유입출금식 예금",
  TIMDEP: "정기예금",
  INSTSAVACC: "정기적금",
  CRDCARD: "신용카드",
  DEBICARD: "체크카드",
  BORR: "차입금",
  LOAN: "대여금",
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

export const UseKind: Record<string, string> = {
  BIZ: "사업목적",
  PERSONAL: "개인사용목적",
};

export const CorpType: Record<string, string> = {
  C: "법인",
  P: "개인",
};

export const tradeKind: Record<string, string> = {
  CREDIT: "신용",
  CHECK: "체크",
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

export const Category: Array<any> = [
  {order: 10, code: "110", name: "식비"},
  {order: 20, code: "120", name: "카페/간식"},
  {order: 30, code: "130", name: "편의점/마트/잡화"},
  {order: 40, code: "140", name: "술/유흥"},
  {order: 50, code: "150", name: "쇼핑"},
  {order: 60, code: "160", name: "취미/여가"},
  {order: 70, code: "170", name: "의료/건강/피트니스"},
  {order: 80, code: "180", name: "주거비"},
  {order: 90, code: "190", name: "통신/전기료"},
  {order: 100, code: "200", name: "미용"},
  {order: 110, code: "210", name: "교통/자동차"},
  {order: 120, code: "220", name: "여행/숙박"},
  {order: 130, code: "230", name: "생활"},
  {order: 140, code: "240", name: "교육"},
  {order: 150, code: "250", name: "예금"},
  {order: 160, code: "260", name: "카드대금"},
  {order: 170, code: "270", name: "세금"},
  {order: 180, code: "280", name: "보험"},
  {order: 190, code: "290", name: "ATM출금"},
  {order: 200, code: "300", name: "이체"},
  {order: 210, code: "310", name: "투자"},
  {order: 220, code: "320", name: "기타금융"},
  {order: 230, code: "330", name: "후불결제대금"},
  {order: 240, code: "340", name: "차입금"},
  {order: 250, code: "350", name: "기부/후원"},
  {order: 260, code: "360", name: "급여"},
  {order: 270, code: "370", name: "잡비"},
  {order: 100, code: "400", name: "매출액"},
  {order: 110, code: "410", name: "이자수익"},
  {order: 120, code: "420", name: "매출액"},
  {order: 140, code: "440", name: "배당금수익"},
  {order: 150, code: "450", name: "외환차익"},
  {order: 160, code: "460", name: "투자자산"},
  {order: 170, code: "470", name: "유형자산"},
  {order: 180, code: "480", name: "단기대여금/차입금"},
  {order: 190, code: "490", name: "회사채"},
  {order: 200, code: "500", name: "장기차입금"},
  {order: 210, code: "510", name: "보통예금"},
  {order: 220, code: "520", name: "정기적금"},
  {order: 230, code: "530", name: "정기예금"},
  {order: 240, code: "540", name: "단기투자자산"},
  {order: 250, code: "550", name: "매출채권"},
  {order: 260, code: "560", name: "기타당좌자산"},
  {order: 270, code: "570", name: "투자증권"},
  {order: 280, code: "580", name: "토지"},
  {order: 290, code: "590", name: "설비자산"},
  {order: 300, code: "600", name: "건물"},
  {order: 310, code: "610", name: "기계장치"},
  {order: 320, code: "620", name: "차량운반구"},
  {order: 330, code: "630", name: "급여"},
  {order: 340, code: "640", name: "퇴직급여"},
  {order: 350, code: "650", name: "복리후생비"},
  {order: 360, code: "660", name: "세금과공과"},
  {order: 370, code: "670", name: "임차료"},
  {order: 380, code: "680", name: "접대비"},
  {order: 390, code: "690", name: "광고선전비"},
  {order: 400, code: "700", name: "도서인쇄비"},
  {order: 410, code: "710", name: "비품"},
  {order: 420, code: "720", name: "소모품"},
  {order: 430, code: "730", name: "여비교통비"},
  {order: 440, code: "740", name: "잡비"},
  {order: 450, code: "750", name: "지급수수료"},
  {order: 460, code: "760", name: "차량유지비"},
  {order: 470, code: "770", name: "통신비"},
  {order: 480, code: "780", name: "보험료"},
  {order: 490, code: "790", name: "기타"},
  {order: 500, code: "800", name: "이자비용"},
  {order: 510, code: "810", name: "외환차손"},
  {order: 520, code: "820", name: "외환환산손실"},
  {order: 900, code: "999", name: "미분류"},
];

export const FinClassCode: Record<string, string> = {
  IN1: "번것(수익+)",
  IN2: "빌린것(부채+)",
  IN3: "나머지(자산-)",
  OUT1: "쓴것(비용+)",
  OUT2: "갚은것(부채-)",
  OUT3: "나머지(자산+)",
};

export const TradeKind: Record<string, string> = {
  CREDIT: "신용",
  CHECK: "체크",
  BILL: "세금계산서",
  CASH: "현금",
};
