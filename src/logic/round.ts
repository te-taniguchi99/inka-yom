// ラウンドスリング・シンスリング製品専用：ロット番号→製造年月のルール
// 有効なパターンは以下の2種類：
//   ・10桁「yymm-xxxxH」（例: 2508-1234H）※西暦確定
//   ・6桁「eemmxx」/「yymmxx」※和暦・西暦混在
// 6桁は同じ桁数・同じ位置の数字のため、ee=19〜30 は平成19〜30年(2007〜2018年)にも
// 西暦2019〜2030年にも解釈できてしまい機械的に判定できない。
// ただし2024年2月以降の製品にはTMSのQRコードが付くようになったため、
// QRコードが付いている場合は西暦確定として扱う。

import { isValidManufactureDate } from "./validateDate";

const UNKNOWN_PRODUCT_MESSAGE =
  "このツールでは確定できない製品です。お手数ですが、販売店へお問い合わせください。";

const ROUND_10_PATTERN = /^(\d{2})(\d{2})-\d{4}H$/i;
const ROUND_6_PATTERN = /^(\d{2})(\d{2})\d{2}$/;

export function roundLotToDate(lotNo: string, hasQrCode: boolean): string | null {
  const match10 = ROUND_10_PATTERN.exec(lotNo);
  if (match10) {
    // 10桁は西暦確定
    const yy = Number(match10[1]);
    const mm = Number(match10[2]);
    const year = 2000 + yy;

    if (!isValidManufactureDate(year, mm)) {
      return null;
    }
    return `${year}年${String(mm).padStart(2, "0")}月製造`;
  }

  const match6 = ROUND_6_PATTERN.exec(lotNo);
  if (match6) {
    const ee = Number(match6[1]);
    const mm = Number(match6[2]);

    let year: number;
    if (hasQrCode) {
      // QRコード（TMS）付きは2024年2月以降の製品のため西暦確定
      year = 2000 + ee;
    } else if (ee <= 18) {
      // 平成年（〜2018年）
      year = 1988 + ee;
    } else if (ee >= 31) {
      // 西暦下2桁（2019年〜）
      year = 2000 + ee;
    } else {
      // 和暦・西暦どちらの可能性もあり判定不能
      return UNKNOWN_PRODUCT_MESSAGE;
    }

    if (!isValidManufactureDate(year, mm)) {
      return null;
    }
    return `${year}年${String(mm).padStart(2, "0")}月製造`;
  }

  return UNKNOWN_PRODUCT_MESSAGE;
}
