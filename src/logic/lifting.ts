// リフティング製品専用：ロット番号→製造年月のルール

export function liftingLotToDate(lotNo: string): string | null {
  // 7桁 → 最初の2文字は和暦 3-4文字目は月なので､和暦を西暦に変換
  let len = lotNo.length;
  console.log("len:" + len);

  let ee: number | string;
  let yy: number | string;
  let mm: string;

  if (len === 7) {
    //7桁は絶対に和暦なので､12で減算すれば西暦になる
    ee = Number(lotNo.slice(0, 2));
    mm = lotNo.slice(2, 4);

    yy = ee - 12; // 西暦変換

    return `20${yy}年${mm}月製造`;
  } else if (len === 8) {
    // 8桁はオールセーフ yyxxxxmm
    yy = lotNo.slice(0, 2);
    mm = lotNo.slice(6, 8);
    return `20${yy}年${mm}月製造`;
  } else if (len === 9) {
    // 9桁はペガサス 必ずハイフンが入っていること
    if (!lotNo.includes("-")) {
      return null;
    }
    yy = lotNo.slice(0, 2);
    mm = lotNo.slice(2, 4);
    return `20${yy}年${mm}月製造`;
  } else if (len === 6) {
    // 6桁 yymmdd
    yy = lotNo.slice(0, 2);
    mm = lotNo.slice(2, 4);
    return `20${yy}年${mm}月製造`;
  }

  return null;
}
