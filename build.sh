# ビルドバッチ
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pushd "$SCRIPT_DIR" > /dev/null
# 出力先フォルダを作成
mkdir -p vsix
mkdir -p vsix/bk

# 一応バックアップ
ts=$(date +"%Y%m%d%H%M%s")
f=$(ls ./vsix/*.vsix)
mv "$f" "./vsix/bk/${ts}_$(basename "$f")"

# ビルド
npm run compile
npx @vscode/vsce package --out ./vsix/

# ターミナルに時刻を出力

date
popd > /dev/null




