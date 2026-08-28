import "./style.css";
import { liftingLotToDate } from "./logic/lifting";
import { roundLotToDate } from "./logic/round";
import { hrsLotToDate } from "./logic/hrs";

// formの取得
const forms = document.querySelectorAll<HTMLFormElement>(".lot-form");

// 取得したformにイベントハンドラ登録
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // リロード防止

    const input = form.querySelector<HTMLInputElement>(".lot-input")!;
    const result = form.parentElement!.querySelector<HTMLElement>(".lot-result")!;

    const lotNo = input.value.trim();
    if (lotNo === "") {
      result.textContent = "ロット番号を入力してください";
      return;
    }

    // data-category属性でどの処理に渡すか判定
    const category = form.dataset.category;
    let date: string | null;
    if (category === "lifting") date = liftingLotToDate(lotNo);
    else if (category === "round") date = roundLotToDate(lotNo);
    else if (category === "hrs") date = hrsLotToDate(lotNo);
    else date = null;

    result.textContent = date ?? "該当する製造年月がみつかりませんでした";
  });
});

// 入力欄には数字とハイフン以外を入力できないようにする
// （ラウンドは末尾に"H"が付くパターンがあるため、H/hのみ例外で許可する）
const lotInputs = document.querySelectorAll<HTMLInputElement>(".lot-input");

lotInputs.forEach((input) => {
  const category = input.closest<HTMLFormElement>(".lot-form")?.dataset.category;
  const allowedPattern = category === "round" ? /[^0-9Hh-]/g : /[^0-9-]/g;

  input.addEventListener("input", () => {
    input.value = input.value.replace(allowedPattern, "");
  });
});

// デバッグ
const debugButtons = document.querySelectorAll<HTMLButtonElement>(".debug-fill-btn");

debugButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 「.lot-section」という目印がついた、一番近い祖先要素を探す
    const section = button.closest<HTMLElement>(".lot-section")!;
    const input = section.querySelector<HTMLInputElement>(".lot-input")!;

    input.value = button.dataset.sample ?? "";
    input.focus();
  });
});
