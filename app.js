/**
 * 保存に使用する localStorage のキー
 */
const STORAGE_KEY = "paint-inventory-v1";

/**
 * HTML要素の取得
 */
const listElement = document.getElementById("paintList");
const emptyMessage = document.getElementById("emptyMessage");
const nameInput = document.getElementById("paintName");
const colorInput = document.getElementById("paintColor");
const addButton = document.getElementById("addButton");

/**
 * localStorage から保存された絵の具一覧を取得する。
 * データが存在しない場合や読み込みに失敗した場合は
 * 空の配列を返す。
 */
function loadItems() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("データの読み込みに失敗しました");
        return [];
    }
}

/**
 * 現在の絵の具データを localStorage に保存する。
 */
function saveItems() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/**
 * 絵の具データを画面のリストに表示する。
 * データが空の場合は「まだ登録がありません」を表示する。
 * @param {Array} items 表示する絵の具データ配列
 */
function render(items) {
    listElement.innerHTML = "";

    if (items.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        // 色サークル
        const circle = document.createElement("div");
        circle.className = "color-circle";
        circle.style.backgroundColor = item.color;

        // 名前
        const name = document.createElement("span");
        name.textContent = item.name;

        // 削除ボタン
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerHTML = "&#10006;";

        deleteButton.addEventListener("click", () => {
            deleteItem(index);
        });

        li.appendChild(circle);
        li.appendChild(name);
        li.appendChild(deleteButton);

        listElement.appendChild(li);
    });
}

/**
 * 入力フォームから絵の具名と色を取得し、
 * リストへ新しいアイテムを追加する。
 * 追加後は保存と再描画を行い、入力欄を空に戻す。
 */
function addItem() {
    const name = nameInput.value.trim();
    const color = colorInput.value;

    if (name === "") {
        return;
    }

    items.push({ name, color });

    saveItems();
    render(items);

    nameInput.value = "";
}

/**
 * 指定された位置の絵の具データを削除し、
 * 保存と再描画を行う。
 * @param {number} index 削除する配列の位置
 */
function deleteItem(index) {
    items.splice(index, 1);

    saveItems();
    render(items);
}

/**
 * 起動時処理
 */
let items = loadItems();
render(items);

/**
 * イベント設定
 */
addButton.addEventListener("click", addItem);
