// 簡易パスワード保護（本番環境では推奨されません）
(function() {
    const CORRECT_PASSWORD = 'anker2025'; // パスワードを設定

    // sessionStorageでログイン状態を確認
    if (sessionStorage.getItem('authenticated') !== 'true') {
        const password = prompt('パスワードを入力してください:');

        if (password !== CORRECT_PASSWORD) {
            alert('パスワードが正しくありません');
            window.location.href = 'about:blank';
            return;
        }

        sessionStorage.setItem('authenticated', 'true');
    }
})();
