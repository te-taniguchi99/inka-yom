// ラウンドスリング・シンスリング製品専用：ロット番号→製造年月のルール

import { isValidManufactureDate } from "./validateDate";

export function roundLotToDate(lotNo: string): string | null {
  const len = lotNo.length;

  let yy: number;
  let mm: number;

  if (len === 7) {
    // 7桁は絶対に和暦なので､12で減算すれば西暦になる
    const ee = Number(lotNo.slice(0, 2));
    mm = Number(lotNo.slice(2, 4));
    yy = ee - 12; // 西暦変換
  } else if (len === 8) {
    // 8桁はオールセーフ yyxxxxmm
    yy = Number(lotNo.slice(0, 2));
    mm = Number(lotNo.slice(6, 8));
  } else if (len === 9) {
    // 9桁はペガサス 必ずハイフンが入っていること
    if (!lotNo.includes("-")) {
      return null;
    }
    yy = Number(lotNo.slice(0, 2));
    mm = Number(lotNo.slice(2, 4));
  } else if (len === 6) {
    // 6桁 yymmdd
    yy = Number(lotNo.slice(0, 2));
    mm = Number(lotNo.slice(2, 4));
  } else {
    return null;
  }

  const year = 2000 + yy;
  if (!isValidManufactureDate(year, mm)) {
    return null;
  }

  return `${year}年${String(mm).padStart(2, "0")}月製造`;
}
