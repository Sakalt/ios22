// カメラ機能の追加
async function openCamera() {
    const video = document.createElement('video');
    video.style.width = '100%';
    video.style.height = '100%';
    video.autoplay = true;
    document.getElementById('app-content').innerHTML = ''; // Clear previous content
    document.getElementById('app-content').appendChild(video);

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('カメラへのアクセスに失敗しました:', error);
        document.getElementById('app-content').innerHTML = '<p>カメラ機能の初期化に失敗しました。</p>';
    }
}

function openApp(appName) {
    var content = document.getElementById('app-content');
    switch (appName) {
        case 'calculator':
            content.innerHTML = `<iframe src="https://sakalt.github.io/macOS-palo-alto-fiction-/calc.html" style="width:90%; height:90%; border:none;"></iframe>`;
            break;
        case 'browser':
            content.innerHTML = `<iframe src="about:blank" style="width:100%; height:100%; border:none;"></iframe>`;
            break;
        case 'camera':
            openCamera();
            break;
        case 'dictionary':
            content.innerHTML = `<iframe src="https://amuhiku.netlify.app" style="width:100%; height:100%; border:none;"></iframe>`;
            break;
        case 'notes':
            content.innerHTML = `<textarea style="width:100%; height:100%; border:none;" placeholder="ここにメモを入力してください..."></textarea>`;
            break;
        case 'paint':
            content.innerHTML = `<iframe src="https://sakalt.github.io/paint" style="width:100%; height:100%; border:none;"></iframe>`;
            break;
        case 'music':
            content.innerHTML = `
                <input type="file" id="music-file" accept="audio/*">
                <audio id="music-player" controls style="width:100%; height:40px;">
                    <p>ブラウザが音声要素をサポートしていません。</p>
                </audio>
                <script>
                    document.getElementById('music-file').addEventListener('change', function(event) {
                        var file = event.target.files[0];
                        var player = document.getElementById('music-player');
                        var objectURL = URL.createObjectURL(file);
                        player.src = objectURL;
                        player.play();
                    });
                </script>
            `;
            break;
        default:
            content.innerHTML = `<p>アプリが見つかりません</p>`;
    }
    document.getElementById('app-screen').style.display = 'block';
}

function closeApp() {
    document.getElementById('app-screen').style.display = 'none';
    document.getElementById('lock-screen').style.display = 'block';
}

document.getElementById('unlock-button').addEventListener('click', function() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
});
