# デプロイ手順

## Git のインストール（必要な場合）

```bash
# Xcode Command Line Tools をインストール
xcode-select --install
```

## GitHub にリポジトリを作成して公開

### 1. ローカルで Git リポジトリを初期化

```bash
cd /Users/marinasakaguchi_1/Documents/ai_test
git init
git add .
git commit -m "Initial commit: Anker projector simulator"
```

### 2. GitHub でリポジトリを作成

1. https://github.com/ にアクセス
2. 「New repository」をクリック
3. Repository name: `anker-projector-simulator`
4. Public/Private を選択
5. 「Create repository」をクリック

### 3. リモートリポジトリを追加してプッシュ

```bash
git remote add origin https://github.com/[あなたのユーザー名]/anker-projector-simulator.git
git branch -M main
git push -u origin main
```

---

## GitHub Pages で公開

### 1. GitHub リポジトリの Settings を開く

1. リポジトリページ: `https://github.com/[ユーザー名]/anker-projector-simulator`
2. 「Settings」タブをクリック
3. 左サイドバーから「Pages」をクリック

### 2. GitHub Pages を有効化

- **Source**: Deploy from a branch
- **Branch**: main
- **Folder**: / (root)
- 「Save」をクリック

### 3. 公開完了

数分後、以下の URL でアクセス可能になります：
```
https://[ユーザー名].github.io/anker-projector-simulator/
```

---

## Vercel で公開（代替方法）

### 1. Vercel にアカウント作成

https://vercel.com/ にアクセスして、GitHub アカウントでログイン

### 2. リポジトリをインポート

1. 「Add New...」→「Project」をクリック
2. GitHub から `anker-projector-simulator` を選択
3. 「Import」をクリック
4. そのまま「Deploy」をクリック

### 3. 公開完了

自動的にデプロイされ、以下のような URL が発行されます：
```
https://anker-projector-simulator.vercel.app/
```

---

## 更新方法

### GitHub Pages の場合

```bash
cd /Users/marinasakaguchi_1/Documents/ai_test

# 変更をコミット
git add .
git commit -m "Update: 説明を追加"
git push
```

GitHub Pages は自動的に更新されます（数分かかる場合があります）。

### Vercel の場合

GitHub に push するだけで自動的にデプロイされます。

---

## カスタムドメインの設定（オプション）

### GitHub Pages の場合

1. リポジトリの Settings > Pages
2. 「Custom domain」に独自ドメインを入力
3. DNS レコードを設定

### Vercel の場合

1. プロジェクトの Settings > Domains
2. 独自ドメインを追加
3. DNS レコードを設定

---

## トラブルシューティング

### GitHub Pages で 404 エラーが出る場合

- index.html がルートディレクトリにあることを確認
- Settings > Pages で正しいブランチが選択されているか確認

### 画像が表示されない場合

- 画像 URL が絶対パスではなく相対パスになっているか確認
- CDN からの画像読み込みは問題ない

### 更新が反映されない場合

- GitHub Pages: 最大 10 分待つ
- Vercel: デプロイログを確認

---

## セキュリティ

現在のコードには機密情報は含まれていません。
パスワード保護が必要な場合は、以下を参照してください：

- Vercel Pro: パスワード保護機能あり（$20/月）
- Netlify: パスワード保護機能あり（Pro プラン）
- カスタム認証: auth.js を使用（簡易的）
