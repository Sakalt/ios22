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
    let speedX = (Math.random() - 0.5) * 4; // 横方向の初期速度
    let speedY = (Math.random() - 0.5) * 4; // 縦方向の初期速度
    const boxWidth = document.getElementById('box').clientWidth;
    const boxHeight = document.getElementById('box').clientHeight;

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

        if (positionY <= 0 || positionY >= boxHeight - serial.clientHeight) {
            speedY = -speedY; // 底にぶつかったら反転
        }

        // 他のシリアルとの衝突判定
        serials.forEach(otherSerial => {
            if (serial !== otherSerial) {
                const otherX = parseFloat(otherSerial.style.left);
                const otherY = parseFloat(otherSerial.style.top);
                const dx = positionX - otherX;
                const dy = positionY - otherY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // シリアル同士の衝突判定
                if (distance < serial.clientWidth) {
                    // 反発する処理
                    speedX = -speedX;
                    speedY = -speedY;
                }
            }
        });

        // 底に到達した場合、アニメーションを終了
        if (positionY >= boxHeight - serial.clientHeight) {
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
