let coinCount = loadCoinCount(); // コイン数をローカルストレージから読み込む
let serials = []; // シリアルの配列（ページをリロードすると消える）

document.getElementById('coin-count').innerText = coinCount;

// コイン数をローカルストレージに保存
function saveCoinCount() {
    localStorage.setItem('coinCount', coinCount);
}

// ローカルストレージからコイン数を読み込む
function loadCoinCount() {
    return parseInt(localStorage.getItem('coinCount')) || 65; // 保存されていない場合は0
}

// 食べ物プリンターを使うボタンの処理
document.getElementById('print-button').addEventListener('click', () => {
    if (coinCount < 50) {
        alert("コインが足りません！");
        return;
    }

    coinCount -= 50;
    document.getElementById('coin-count').innerText = coinCount;
    saveCoinCount(); // コインの数を保存

    for (let i = 0; i < 100; i++) {
        createSerial();
    }
});

// シリアル生成関数
function createSerial() {
    const serial = document.createElement('div');
    serial.className = 'serial';
    serial.style.backgroundColor = getRandomColor();
    serial.style.left = `${Math.random() * 280}px`;
    serial.style.top = '0px';
    document.getElementById('box').appendChild(serial);

    // 落下アニメーション
    let position = 0;
    const drop = setInterval(() => {
        position += 2;
        serial.style.top = `${position}px`;

        if (position >= 280) {
            clearInterval(drop);
        }
    }, 20);

    serials.push(serial);
}

// ランダムなシリアルの色を取得
function getRandomColor() {
    const colors = ['green', 'red', '#8B4513', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// シリアルを売る処理
document.getElementById('sell-button').addEventListener('click', () => {
    const sellAmount = serials.length * 5; // シリアル1つにつき5コイン
    coinCount += sellAmount;
    document.getElementById('coin-count').innerText = coinCount;
    saveCoinCount(); // コインの数を保存

    // シリアルを箱から削除
    serials.forEach(serial => serial.remove());
    serials = [];
});
