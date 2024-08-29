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

    // シリアルの動きに関する変数
    let positionX = parseFloat(serial.style.left);
    let positionY = 0;
    let speedX = (Math.random() - 0.5) * 2; // 横方向の初期速度（-1から1の範囲）
    let speedY = 2; // 縦方向の速度
    const boxWidth = document.getElementById('box').clientWidth;

    // 落下アニメーション
    const drop = setInterval(() => {
        positionX += speedX;
        positionY += speedY;
        serial.style.left = `${positionX}px`;
        serial.style.top = `${positionY}px`;

        // 壁との衝突判定
        if (positionX <= 0 || positionX >= boxWidth - serial.clientWidth) {
            speedX = -speedX; // 壁にぶつかったら反転
        }

        // 底との衝突判定
        if (positionY >= 280) {
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
    const sellAmount = serials.length * 0.6; // シリアル1つにつき5コイン
    coinCount += sellAmount;
    document.getElementById('coin-count').innerText = coinCount;
    saveCoinCount(); // コインの数を保存

    // シリアルを箱から削除
    serials.forEach(serial => serial.remove());
    serials = [];
});
