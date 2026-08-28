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
const lotInputs = document.querySelectorAll<HTMLInputElement>(".lot-input");

lotInputs.forEach((input) => {
  input.addEventListener("input", () => {
    // 数字（0-9）とハイフン以外の文字を、入力されたそばから削除する
    input.value = input.value.replace(/[^0-9-]/g, "");
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
