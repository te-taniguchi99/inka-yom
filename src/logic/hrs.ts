// HRS製品専用：ロット番号→製造年月のルール
// 7桁「eemmxxx」形式のみ有効。ただし前期・後期で年の意味が異なる：
//   ・2018年まで(平成)は和暦2桁 → 西暦 = 1988 + ee
//   ・2019年以降は西暦下2桁     → 西暦 = 2000 + ee
// 同じ桁数・同じ位置の数字のため、ee=19〜30 は平成19〜30年(2007〜2018年)にも
// 西暦2019〜2030年にも解釈できてしまい機械的に判定できない。
// そのため ee<=18 は和暦確定、ee>=31 は西暦確定とし、19〜30 は安全側に倒して
// 「確定できない製品」として扱う。

import { isValidManufactureDate } from "./validateDate";

const UNKNOWN_PRODUCT_MESSAGE =
  "このツールでは確定できない製品です。お手数ですが、販売店へお問い合わせください。";

const HRS_LOT_PATTERN = /^(\d{2})(\d{2})\d{3}$/;

export function hrsLotToDate(lotNo: string): string | null {
  const match = HRS_LOT_PATTERN.exec(lotNo);
  if (!match) {
    return UNKNOWN_PRODUCT_MESSAGE;
  }

  const ee = Number(match[1]);
  const mm = Number(match[2]);

  let year: number;
  if (ee <= 18) {
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
