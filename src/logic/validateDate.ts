// 製造年月として妥当な範囲かどうかをチェックする共通関数
// 2005年1月～現在の年月までを「存在する」とみなす

export function isValidManufactureDate(year: number, month: number): boolean {
  // 月が1～12の範囲外なら、そもそも不正
  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // JavaScriptの月は0始まり(0=1月)なので+1する

  // 2005年より前は存在しない
  if (year < 2005) {
    return false;
  }

  // 現在より未来の年月は存在しない
  if (year > currentYear) {
    return false;
  }
  if (year === currentYear && month > currentMonth) {
    return false;
  }

  return true;
}