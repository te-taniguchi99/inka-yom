// ラウンドスリング・シンスリング製品専用：ロット番号→製造年月のルール
// 有効なパターンは "yymm-xxxxH" の10桁のみ（例: 2508-1234H）

import { isValidManufactureDate } from "./validateDate";

const UNKNOWN_PRODUCT_MESSAGE =
  "このツールでは確定できない製品です。お手数ですが、販売店へお問い合わせください。";

const ROUND_LOT_PATTERN = /^(\d{2})(\d{2})-\d{4}H$/i;

export function roundLotToDate(lotNo: string): string | null {
  const match = ROUND_LOT_PATTERN.exec(lotNo);
  if (!match) {
    return UNKNOWN_PRODUCT_MESSAGE;
  }

  const yy = Number(match[1]);
  const mm = Number(match[2]);
  const year = 2000 + yy;

  if (!isValidManufactureDate(year, mm)) {
    return null;
  }

  return `${year}年${String(mm).padStart(2, "0")}月製造`;
}
