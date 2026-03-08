# Ankerプロジェクター投影サイズシミュレーター 設計仕様書

## 1. システム概要

### 1.1 プロジェクト目的
Anker Nebulaプロジェクターの購買決定を支援するため、ユーザーが自宅の環境で実際にどのようなサイズの映像が投影できるかを直感的に体験できるシミュレーションツールを提供する。

### 1.2 対象ユーザー
- プロジェクターの購入を検討している一般消費者
- 部屋のサイズや設置環境に応じた最適なモデルを選びたいユーザー
- 複数のモデルを比較検討したいユーザー

### 1.3 主要機能
1. **デュアル計算モード**: 画面サイズから距離、または距離から画面サイズを算出
2. **デュアルビュー可視化**: 上から見た図と正面から見た図で実際のサイズ感を体験
3. **リアルタイムシミュレーション**: スライダー操作で即座に結果を更新
4. **モデル比較機能**: 7機種の投影距離比較表と2機種詳細比較
5. **明るさシミュレーション**: ANSIルーメンに応じた使用環境のアドバイス
6. **購入導線**: 公式サイトとAmazonへの直リンク

### 1.4 技術的特徴
- **Pure Vanilla JavaScript**: ビルド不要、外部ライブラリ不要
- **完全クライアントサイド**: サーバー不要、静的ホスティング可能
- **レスポンシブデザイン**: モバイルファーストで最適化
- **線形補間アルゴリズム**: メーカー実測値に基づく高精度計算

---

## 2. 機能仕様

### 2.1 デュアル計算モード

#### 2.1.1 モード1: 画面サイズから距離を計算
**ユースケース**: 「100インチの画面が欲しい」→「何m必要か知りたい」

**入力**:
- 希望する画面サイズ（インチ）: 10-300インチ
- プロジェクターモデル選択

**出力**:
- 必要な投影距離（m）
- 画面の幅×高さ（cm）
- 必要な部屋の広さ（畳数）
- 明るさに応じた使用環境アドバイス

**計算ロジック**:
```javascript
// プロジェクターのデータポイント間で線形補間
function interpolateDistance(dataPoints, screenSize) {
    // データポイントをソート
    const sorted = dataPoints.sort((a, b) => a.screenSize - b.screenSize)

    // 範囲外チェック
    if (screenSize < sorted[0].screenSize || screenSize > sorted[sorted.length-1].screenSize) {
        return null
    }

    // 補間計算
    for (let i = 0; i < sorted.length - 1; i++) {
        if (screenSize >= sorted[i].screenSize && screenSize <= sorted[i+1].screenSize) {
            const ratio = (screenSize - sorted[i].screenSize) /
                         (sorted[i+1].screenSize - sorted[i].screenSize)
            return sorted[i].distance + ratio * (sorted[i+1].distance - sorted[i].distance)
        }
    }
}
```

#### 2.1.2 モード2: 距離から画面サイズを計算
**ユースケース**: 「部屋の奥行きが3mしかない」→「何インチまで投影可能か知りたい」

**入力**:
- 利用可能な投影距離（m）: 0.1-10m
- プロジェクターモデル選択

**出力**:
- 投影可能な画面サイズ（インチ）
- 画面の幅×高さ（cm）
- 必要な部屋の広さ（畳数）
- 明るさに応じた使用環境アドバイス

**計算ロジック**:
```javascript
// 距離からサイズを逆算
function interpolateScreenSize(dataPoints, distance) {
    // モード1と同様の線形補間アルゴリズム
    // distanceとscreenSizeを入れ替えて計算
}
```

### 2.2 デュアルビュー可視化

#### 2.2.1 上から見た図（Top View）
**目的**: 投影距離と画面サイズの関係を俯瞰的に理解

**表示要素**:
- プロジェクター位置（三角形）
- スクリーン位置（矩形）
- 投影光の広がり（グラデーション三角形）
- 65型TV（基準、常に150px固定）
- 投影距離の寸法線
- 画面サイズの寸法線

**固定スケール仕様**:
```javascript
// 65型TV（幅143cm）を基準として150pxに固定
const tv65Width = 143 // cm
const tv65PixelWidth = 150 // px
const baseScale = tv65PixelWidth / tv65Width // 1.05 px/cm

// 最大スケールは画面サイズに応じて制限
const maxScale = Math.min(baseScale, maxScaleByWidth, maxScaleByHeight)
```

**レスポンシブ対応**:
- PC: 900×500px
- スマホ: 900×450px、フォントサイズ1.4倍、上部余白140px

#### 2.2.2 正面から見た図（Front View）
**目的**: 壁との比較で実際のサイズ感を体験

**表示要素**:
- 平均的な壁（400cm×240cm）
- スクリーン（実サイズ比率）
- ドアシルエット（200cm）
- 壁の高さ寸法線（2.4m）
- 画面サイズ寸法線

**スケール計算**:
```javascript
// 壁をviewBoxの85%に収める
const targetWallWidth = viewBoxWidth * 0.85
const scaleX = targetWallWidth / wallWidthCm

// 縦横比を維持
const scaleY = scaleX
```

**レスポンシブ対応**:
- PC: 900×600px
- スマホ: 800×450px（左シフト-200px）、フォントサイズ1.3倍

### 2.3 モデル比較機能

#### 2.3.1 画面サイズ別投影距離比較表
**目的**: 「100インチ欲しい」→「全機種で何m必要か」を一目で確認

**仕様**:
- 対象サイズ: 35, 40, 60, 80, 100, 120, 150, 180, 200, 300インチ
- 対象機種: 全7機種
- 各セルに製品画像を表示
- 範囲モデル（X1）は「2.0m - 3.3m」形式で表示
- データポイント間は線形補間で算出
- 対応外のサイズは「-」表示

**スクロールインジケーター**:
- 右端に境界線の影を表示
- スクロールして端に達すると影が消える
- スクロールバー常時表示

#### 2.3.2 2機種詳細比較
**目的**: 2つのモデルを並べて仕様と投影範囲を詳細比較

**比較項目**:
- タイプ（ホーム型/モバイル型）
- 解像度（4K/フルHD/HD）
- 明るさ（ANSIルーメン）
- 投影サイズ範囲（インチ）
- 投影距離範囲（m）
- 重量
- バッテリー駆動時間（該当機種のみ）

### 2.4 エラーハンドリング

#### 2.4.1 投影サイズ超過エラー
**トリガー条件**:
- 希望サイズ > 最大投影サイズ
- 希望サイズ < 最小投影サイズ

**表示内容**:
- エラーアイコン（赤）
- メッセージ: 「投影サイズが大きすぎます」または「投影サイズが小さすぎます」
- 対応範囲の表示
- 推奨サイズの提示
- 視覚化は継続（エラー状態で描画）

#### 2.4.2 投影距離超過エラー
**トリガー条件**:
- 希望距離 > 最大投影距離
- 希望距離 < 最小投影距離

**表示内容**:
- エラーアイコン（赤）
- メッセージ: 「投影距離が遠すぎます」または「投影距離が短すぎます」
- 対応範囲の表示
- 視覚化は継続（エラー状態で描画）

### 2.5 明るさシミュレーション

**ANSIルーメンに応じた背景透明度**:
```javascript
const bgOpacity = lumens >= 3000 ? 0.9 :  // 3500ルーメン: 日中利用可能
                  lumens >= 1500 ? 0.8 :  // 1800ルーメン: 昼間利用可能
                  lumens >= 500  ? 0.6 :  // 650ルーメン: カーテン推奨
                                   0.4    // 380ルーメン以下: 暗室推奨
```

**明るさアドバイステキスト一覧**:

| ルーメン範囲 | アラートタイプ | アイコン | 表示テキスト |
|------------|-------------|---------|------------|
| >= 3500 | success | ☀️ | `{lumens}ANSIルーメン。シリーズ史上最高の明るさを誇ります。日中の明るいリビングでもカーテンを閉め切ることなく、鮮明な映像を楽しめます。` |
| >= 1800 | success | ☀️ | `{lumens}ANSIルーメン。昼間の利用も可能な4Kモデルです。ホームシアター体験に十分な明るさと高画質を両立しています。` |
| >= 650 | success | ☀️ | `{lumens}ANSIルーメン。カーテンを閉めた状態であれば昼間でも利用可能な明るさです。リビングでの普段使いに適しています。` |
| >= 380 | info | 🌤️ | `{lumens}ANSIルーメン。同価格帯のホーム型と比較すると明るい部類ですが、鮮明に楽しむには夜間や遮光カーテンの使用を推奨します。` |
| >= 300 | info | 🌤️ | `{lumens}ANSIルーメン。レーザー光源を採用し、モバイル型の中では際立つ明るさですが、鮮明に楽しむには、夜間や暗くしたお部屋での利用を推奨します。` |
| >= 200 | warning | 🌙 | `{lumens}ANSIルーメン。鮮明に楽しむには、夜間や暗くしたお部屋での利用を推奨します。コンパクトさと映像美のバランスが取れたモデルです。` |
| < 200 | warning | 🌙 | `{lumens}ANSIルーメン。完全に暗くした環境や夜間の利用を推奨します。シリーズ最軽量で持ち運びやすく、暗い環境で活躍します。` |

**HTML構造**:
```html
<div class="alert alert-{type}">
    <span class="alert-icon">{icon}</span>
    <div class="alert-content">
        <div class="alert-title">明るさアドバイス</div>
        <div class="alert-message">{message}</div>
    </div>
</div>
```

### 2.6 部屋の広さアドバイス

**計算ロジック**:
```javascript
// 投影距離の1.2倍を奥行きとして確保
const roomDepthM = throwDistance * 1.2

// 正方形の部屋を仮定
const roomAreaSqM = Math.pow(roomDepthM, 2)

// 1畳 ≈ 1.62m²
const estimatedTatami = roomAreaSqM / 1.62
```

**部屋の広さアドバイステキスト一覧**:

| 畳数範囲 | アラートタイプ | アイコン | 表示テキスト |
|---------|-------------|---------|------------|
| < 6畳 | info | 🏠 | `大体{Math.ceil(estimatedTatami)}畳程度の部屋の広さが必要です。コンパクトな空間でも楽しめます。` |
| 6〜10畳 | info | 🏠 | `大体{Math.ceil(estimatedTatami)}畳程度の部屋の広さが必要です。一般的なリビングに最適です。` |
| >= 10畳 | info | 🏠 | `大体{Math.ceil(estimatedTatami)}畳以上の広い部屋が必要です。大画面体験に最適な環境です。` |

**HTML構造**:
```html
<div class="alert alert-info">
    <span class="alert-icon">🏠</span>
    <div class="alert-content">
        <div class="alert-title">部屋の広さアドバイス</div>
        <div class="alert-message">{message}</div>
    </div>
</div>
```

---

## 3. 技術仕様

### 3.1 技術スタック

**フロントエンド**:
- Pure Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- SVG (動的生成)

**フォント**:
- Google Fonts: Noto Sans JP (400, 500, 600, 700)
- カスタムフォント: Mont for Anker（5ウェイト、Ankerロゴ専用）

**ホスティング**:
- GitHub Pages（推奨）
- Vercel / Netlify（代替案）

**ブラウザ対応**:
- Chrome/Edge (最新)
- Firefox (最新)
- Safari (最新)
- iOS Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 3.2 ファイル構成

```
ai_test/
├── index.html           # メインHTML（243行）
├── styles.css           # スタイルシート（2,200行）
├── app.js               # アプリケーションロジック（1,680行）
├── fonts/               # カスタムフォント
│   ├── MontForAnker-Bold.otf
│   ├── MontForAnker-Regular.otf
│   ├── MontForAnker-Book.otf
│   ├── MontForAnker-Heavy.otf
│   └── MontForAnker-SemiBold.otf
├── auth.js              # 簡易認証（オプション）
├── README.md            # プロジェクト説明
├── CLAUDE.md            # 開発者向けガイド
├── DEPLOY.md            # デプロイ手順
└── DESIGN.md            # 本ファイル
```

### 3.3 アーキテクチャ

#### 3.3.1 状態管理
```javascript
// グローバルステート
const state = {
    mode: 'single',              // 'single' | 'compare'
    calcMode: 'size-to-distance', // 'size-to-distance' | 'distance-to-size'
    selectedProjectorId: null,    // 選択中のプロジェクターID
    throwDistance: 2.7,           // 投影距離（m）
    desiredSize: 100,             // 希望画面サイズ（インチ）
    compareModel1: null,          // 比較モデル1
    compareModel2: null,          // 比較モデル2
    viewMode: 'top'               // 'top' | 'front'
}
```

#### 3.3.2 主要関数

**初期化**:
```javascript
function init() {
    renderProjectorCards()
    renderMobileSelect()
    renderSizeDistanceTable()
    attachEventListeners()
    switchMode(state.mode)
}
```

**計算処理**:
```javascript
function calculate() {
    // 1. 選択されたプロジェクターを取得
    // 2. 計算モードに応じて補間関数を実行
    // 3. 範囲チェック（エラー判定）
    // 4. 結果表示 or エラー表示
    // 5. 視覚化更新
}
```

**描画処理**:
```javascript
function drawTopView(screenWidth, screenHeight, throwDistance, screenDiagonal, isError, lumens)
function drawFrontView(screenWidth, screenHeight, screenDiagonal, isError, lumens)
```

**イベントハンドリング**:
```javascript
function attachEventListeners() {
    // モード切替
    // プロジェクター選択
    // スライダー入力
    // ビュー切替
    // 比較機能
}
```

### 3.4 データ構造

#### 3.4.1 プロジェクターデータ
```javascript
const projectorData = {
    'model-id': {
        name: 'Nebula Model Name',
        image: 'https://...jpg',
        price: '¥199,900',
        url: 'https://www.ankerjapan.com/products/xxx',
        amazonUrl: 'https://www.amazon.co.jp/dp/XXXXX?tag=aoositmdtlpg-22',
        lumens: 1800,                    // ANSIルーメン
        resolution: '4K',                 // 解像度
        weight: '約4.5kg',                // 重量
        type: 'ホーム型',                 // タイプ
        dataPoints: [                     // 実測データポイント
            { screenSize: 60, distance: 1.6 },
            { screenSize: 100, distance: 2.7 }
        ]
    }
}
```

#### 3.4.2 範囲モデル（Nebula X1）
```javascript
'x1': {
    name: 'Nebula X1',
    // ... 共通フィールド
    dataPoints: [
        { screenSize: 80, distanceMin: 1.6, distanceMax: 2.6 },
        { screenSize: 100, distanceMin: 2.0, distanceMax: 3.3 }
    ]
}
```

**範囲補間アルゴリズム**:
```javascript
// minとmaxを両方補間
const interpolatedMin = interpolateDistance(dataPoints.map(dp => ({
    screenSize: dp.screenSize,
    distance: dp.distanceMin
})), screenSize)

const interpolatedMax = interpolateDistance(dataPoints.map(dp => ({
    screenSize: dp.screenSize,
    distance: dp.distanceMax
})), screenSize)

// 結果: "2.0m - 3.3m"
```

---

## 4. UI/UX設計

### 4.1 カラーパレット

```css
:root {
    --nebula-primary: #17BBEF;      /* Nebulaブランドカラー */
    --nebula-secondary: #0da8db;    /* ホバー時 */
    --text-primary: #2d3748;        /* メインテキスト */
    --text-secondary: #4a5568;      /* サブテキスト */
    --text-muted: #718096;          /* 非活性テキスト */
    --bg-light: #f7fafc;            /* 背景（薄） */
    --bg-gradient-start: #e0f7ff;   /* グラデーション開始 */
    --bg-gradient-end: #ffffff;     /* グラデーション終了 */
    --border-light: #e2e8f0;        /* 境界線 */
    --success: #10b981;             /* 成功/TV基準 */
    --error: #dc3545;               /* エラー */
}
```

### 4.2 タイポグラフィ

**フォントスタック**:
```css
body {
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont,
                 'Segoe UI', 'Hiragino Sans', sans-serif;
}

.anker-brand {
    font-family: 'Mont for Anker', sans-serif;
    font-weight: 700;
}
```

**サイズ階層**:
- h1: 2rem (PC) / 1.3rem (スマホ)
- h2: 1.25rem (PC) / 0.9rem (スマホ)
- body: 1rem (PC) / 0.8-0.9rem (スマホ)
- small: 0.85rem (PC) / 0.7rem (スマホ)

### 4.3 レスポンシブブレークポイント

```css
/* タブレット */
@media (max-width: 768px) {
    .two-column-layout {
        grid-template-columns: 1fr;
    }
}

/* スマホ */
@media (max-width: 480px) {
    /* フォントサイズ拡大 */
    /* パディング縮小 */
    /* カスタムドロップダウン表示 */
    /* STEPバッジ表示 */
}
```

### 4.4 インタラクション設計

**ホバーエフェクト**:
```css
.card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    transition: all 0.3s ease;
}

.projector-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(23, 187, 239, 0.25);
}
```

**トランジション**:
```css
:root {
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

**スクロールインジケーター**:
- 境界線の影（グラデーション）
- スクロール位置監視でフェードアウト
- スクロールバー常時表示（スマホ）

### 4.5 アクセシビリティ

**セマンティックHTML**:
- `<section>`, `<article>`, `<nav>` 使用
- 見出し階層の適切な設定

**ARIAラベル**:
```html
<button aria-label="上から見た図に切り替え">📐 上から見た図</button>
```

**キーボード操作**:
- Tab順序の最適化
- Enter/Spaceでボタン操作

**コントラスト比**:
- WCAG AA準拠（4.5:1以上）

---

## 5. 計算アルゴリズム詳細

### 5.1 線形補間の数学的定義

**1次元線形補間**:
```
y = y₁ + (x - x₁) × (y₂ - y₁) / (x₂ - x₁)
```

**適用例**:
- x: 画面サイズ（インチ）
- y: 投影距離（m）

既知の2点 (x₁, y₁), (x₂, y₂) から、任意のx値に対するy値を算出。

### 5.2 実装コード

```javascript
function interpolateDistance(dataPoints, screenSize) {
    // データポイントをソート
    const sorted = [...dataPoints].sort((a, b) => a.screenSize - b.screenSize)

    // 完全一致チェック
    const exactMatch = sorted.find(dp => dp.screenSize === screenSize)
    if (exactMatch) return exactMatch.distance

    // 範囲外チェック
    const minSize = sorted[0].screenSize
    const maxSize = sorted[sorted.length - 1].screenSize
    if (screenSize < minSize || screenSize > maxSize) return null

    // 線形補間
    for (let i = 0; i < sorted.length - 1; i++) {
        const p1 = sorted[i]
        const p2 = sorted[i + 1]

        if (screenSize >= p1.screenSize && screenSize <= p2.screenSize) {
            const ratio = (screenSize - p1.screenSize) /
                         (p2.screenSize - p1.screenSize)
            return p1.distance + ratio * (p2.distance - p1.distance)
        }
    }

    return null
}
```

### 5.3 画面寸法計算

**16:9アスペクト比から幅・高さを算出**:

```javascript
// 対角線（インチ）から幅を算出
const aspectRatio = 16 / 9
const widthInches = Math.sqrt(
    Math.pow(diagonal, 2) / (1 + Math.pow(1/aspectRatio, 2))
)

// インチ→cm変換
const widthCm = widthInches * 2.54
const heightCm = widthCm / aspectRatio
```

**数学的証明**:
```
対角線² = 幅² + 高さ²
高さ = 幅 / (16/9) = 幅 × 9/16

対角線² = 幅² + (幅 × 9/16)²
対角線² = 幅² × (1 + 81/256)
対角線² = 幅² × 337/256

幅 = 対角線 × √(256/337)
```

### 5.4 部屋の広さ計算

```javascript
// 投影距離の1.2倍を奥行きとして確保
const roomDepthM = throwDistance * 1.2

// 正方形の部屋を仮定
const roomAreaSqM = Math.pow(roomDepthM, 2)

// 1畳 ≈ 1.62m²
const estimatedTatami = roomAreaSqM / 1.62
```

**前提条件**:
- プロジェクター設置スペース
- 視聴者の座る位置
- 正方形の部屋

---

## 6. パフォーマンス最適化

### 6.1 描画最適化

**SVG動的生成**:
- テンプレートリテラルで文字列結合
- innerHTML一括更新（再描画1回）
- 不要な再計算を避ける

**レスポンシブ対応**:
```javascript
const isMobile = window.innerWidth <= 480
const fontSizeMultiplier = isMobile ? 1.4 : 1
const canvasHeight = isMobile ? 450 : 500
```

### 6.2 イベントハンドリング

**入力デバウンス**:
- スライダー: リアルタイム（デバウンスなし）
- 数値入力: input イベントで即座に反映

**イベント委譲**:
```javascript
document.getElementById('projector-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.projector-card')
    if (card) selectProjector(card.dataset.id)
})
```

### 6.3 メモリ管理

**不要なDOM操作の削減**:
- 一括更新
- DocumentFragmentは不使用（テンプレートリテラル推奨）

**イベントリスナーのクリーンアップ**:
- ページ遷移なしのSPAのため不要
- モード切替時も既存リスナーを保持

---

## 7. セキュリティ

### 7.1 XSS対策

**ユーザー入力の検証**:
- 数値入力: `type="number"` + min/max属性
- テキスト入力: なし（ユーザー入力テキストなし）

**HTMLエスケープ**:
- テンプレートリテラル使用
- ユーザー生成コンテンツなし

### 7.2 認証（オプション）

**auth.js**:
```javascript
// 簡易パスワード保護（開発/テスト用）
const CORRECT_PASSWORD = 'anker2025'

if (sessionStorage.getItem('authenticated') !== 'true') {
    const password = prompt('パスワードを入力してください:')
    if (password !== CORRECT_PASSWORD) {
        window.location.href = 'about:blank'
        return
    }
    sessionStorage.setItem('authenticated', 'true')
}
```

**注意**: 本番環境では推奨されない。サーバーサイド認証を使用すべき。

---

## 8. デプロイ

### 8.1 GitHub Pages

**手順**:
1. GitHubリポジトリ作成
2. ファイルをpush
3. Settings > Pages > Source: main / root
4. 数分で `https://[username].github.io/[repo]/` で公開

**利点**:
- 無料
- 自動デプロイ
- HTTPSデフォルト

### 8.2 Vercel

**手順**:
1. Vercelアカウント作成
2. GitHubリポジトリ連携
3. 自動デプロイ

**利点**:
- 高速CDN
- プレビューデプロイ
- カスタムドメイン無料

---

## 9. 今後の拡張性

### 9.1 機能追加候補

**VR/ARプレビュー**:
- WebXR APIでAR投影シミュレーション
- スマホカメラで実際の部屋に投影イメージを重畳

**保存・共有機能**:
- ローカルストレージに設定保存
- URL共有（クエリパラメータ）

**3Dビュー**:
- Three.jsで3D空間表現
- カメラ視点での投影イメージ

**AI推奨機能**:
- 部屋の写真をアップロード
- 画像認識で最適なモデルを推奨

### 9.2 技術的改善

**TypeScript化**:
- 型安全性の向上
- IDE補完の強化

**コンポーネント化**:
- Web Components
- Vue/React導入（ビルド必要）

**テスト**:
- Jest (単体テスト)
- Playwright (E2Eテスト)

**CI/CD**:
- GitHub Actions
- 自動テスト + デプロイ

---

## 10. 制約事項・既知の問題

### 10.1 ブラウザ制約

**iOS Safari**:
- スクロールバーが非表示（OS仕様）
- 境界線の影でスクロール可能性を示す

**古いブラウザ**:
- IE11非対応（ES6使用）
- CSS Grid/Flexbox必須

### 10.2 精度

**線形補間の限界**:
- データポイント間は直線で近似
- 実際のレンズ特性は非線形の場合あり
- メーカー実測値に基づくため実用上問題なし

**部屋の広さ計算**:
- 正方形の部屋を仮定
- 実際の部屋の形状により異なる

### 10.3 パフォーマンス

**大量のSVG要素**:
- モバイルで描画負荷
- 最適化済み（テンプレートリテラル一括更新）

**画像読み込み**:
- 外部CDN依存（Anker公式サイト）
- 画像遅延読み込みは未実装

---

## 11. 用語集

| 用語 | 説明 |
|------|------|
| **ANSIルーメン** | プロジェクターの明るさを示す国際標準規格 |
| **スローレシオ** | 投影距離÷画面幅の比率（従来のプロジェクター計算方式） |
| **線形補間** | 既知の2点から中間値を直線で推定する数学的手法 |
| **アスペクト比** | 画面の縦横比（16:9が一般的） |
| **viewBox** | SVGの座標系を定義する属性 |
| **固定スケール** | 基準オブジェクト（65型TV）を一定サイズに固定する手法 |

---

## 12. 変更履歴

| 日付 | バージョン | 変更内容 |
|------|-----------|---------|
| 2026-03-09 | 1.0.0 | 初版作成 |

---

## 13. 参考資料

**技術ドキュメント**:
- [MDN Web Docs - SVG](https://developer.mozilla.org/ja/docs/Web/SVG)
- [MDN Web Docs - CSS Grid](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)
- [線形補間 - Wikipedia](https://ja.wikipedia.org/wiki/線形補間)

**プロジェクト内ドキュメント**:
- [README.md](./README.md) - ユーザー向け説明
- [CLAUDE.md](./CLAUDE.md) - 開発者向けガイド
- [DEPLOY.md](./DEPLOY.md) - デプロイ手順

**外部リンク**:
- [Anker Japan公式サイト](https://www.ankerjapan.com/)
- [GitHub リポジトリ](https://github.com/badgirll/anker-projector-simulator)
- [GitHub Pages デモ](https://badgirll.github.io/anker-projector-simulator/)
