document.getElementById('unlock-button').addEventListener('click', function() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
});

function openApp(appName) {
    var content = document.getElementById('app-content');
    switch (appName) {
        case 'calculator':
            content.innerHTML = `<iframe src="https://www.desmos.com/scientific" style="width:100%; height:100%; border:none;"></iframe>`;
            break;
        case 'browser':
            content.innerHTML = `<iframe src="about:blank" style="width:100%; height:100%; border:none;"></iframe>`;
            break;
        case 'camera':
            content.innerHTML = `<p>カメラアプリ（デモでは機能しません）</p>`;
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
