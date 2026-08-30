# Lean Abs Coach — iPhone / PWA 完全対応版 v2.0

このフォルダは、GitHub Pages などの HTTPS 静的ホスティングへそのまま配置できるPWAです。

## 追加したPWA対応
- iPhone用 `apple-touch-icon` 180×180
- PWA用 192×192 / 512×512 / maskable 512×512 アイコン
- iOS standalone / status bar / safe-area 対応
- Web App Manifest 強化（id / scope / orientation / categories）
- Service Worker によるオフライン起動
- 更新確認・新バージョン反映処理
- Android等のインストールプロンプト対応
- iPhoneではアプリ内に「共有 → ホーム画面に追加」の案内を表示
- ダークモード対応

## GitHub Pages への公開手順
1. GitHubで `lean-abs-coach` などの Public repository を新規作成。
2. このZIPを解凍し、中のファイルを「フォルダごとではなく中身すべて」リポジトリ直下へアップロード。
3. GitHubの `Settings` → `Pages`。
4. `Build and deployment` → Source: `Deploy from a branch`。
5. Branch: `main` / Folder: `/ (root)` → `Save`。
6. 数分後に `https://ユーザー名.github.io/lean-abs-coach/` 形式のURLが発行されます。

## iPhoneへのインストール
1. 発行されたURLを **Safari** で開く。
2. Safariの共有ボタン（□↑）をタップ。
3. `ホーム画面に追加` を選択。
4. `追加`。
5. ホーム画面の `Lean Abs` アイコンから起動。

ホーム画面から起動したときは、Safariのアドレスバーが消え、独立アプリとして表示されます。

## データ保存
トレーニング・体組成データは端末内のブラウザストレージ（localStorage）に保存されます。GitHubへ記録データがアップロードされることはありません。

機種変更・Safariデータ削除に備えて、アプリの `設定 → JSONバックアップ` を定期的に利用してください。

## ChatGPTとの連携
現版はAPIキーを端末のJavaScriptへ埋め込まず、安全性を優先しています。`報告` タブで文章を生成し、コピーまたは共有してChatGPTへ送れます。
