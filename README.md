# 🎯 Prompt Hub - Template Editor

一個功能強大的模板編輯器，整合 Markdown 編輯與參數化功能，使用 React 開發。

## ✨ 功能特色

- 📝 **Markdown 編輯器**：支持 Markdown 語法與即時預覽
- 🔧 **參數化功能**：使用 `{{參數名}}` 語法創建動態模板
- 💾 **模板管理**：建立、編輯、保存與刪除多個模板
- 🎨 **模板套用**：輸入參數值以生成最終內容
- 📋 **一鍵複製**：輕鬆複製生成的內容到剪貼板

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm start
```

應用程式將在 [http://localhost:3000](http://localhost:3000) 上運行。

### 構建生產版本

```bash
npm run build
```

## 📖 使用方法

1. **建立模板**：點擊 "Create New Template" 按鈕
2. **編輯內容**：在 Markdown 編輯器中輸入內容，使用 `{{參數名}}` 定義參數
3. **預覽效果**：切換預覽模式查看渲染後的 Markdown
4. **填入參數**：在參數區域填入實際值
5. **套用模板**：點擊 "Apply Parameters" 生成最終內容
6. **複製使用**：點擊 "Copy to Clipboard" 複製結果

## 🛠️ 技術棧

- React 18
- react-markdown
- CSS3 (Flexbox & Grid)

## 📦 專案結構

```
prompt-hub-editor/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TemplateEditor.js
│   │   ├── TemplateEditor.css
│   │   ├── TemplateList.js
│   │   └── TemplateList.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## 📄 License

MIT
