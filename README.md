<div align="center">

<!-- Hero Banner - Replace with your actual screenshot or GIF -->
<img src="https://via.placeholder.com/1200x600/050508/00f5ff?text=AgentSannyii+Aurora+Dream+UI" alt="AgentSannyii Hero Banner" width="100%">

<!-- Animated Logo or Badge -->
<img src="https://via.placeholder.com/200x200/050508/00f5ff?text=🤖" alt="AgentSannyii Logo" width="120">

# AgentSannyii

### 🌌 Single-File AI Utilities Platform

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white&color=050508" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white&color=050508" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&color=050508" alt="Tailwind">
  <img src="https://img.shields.io/badge/Offline-Ready-success?style=for-the-badge&color=050508" alt="Offline Ready">
</p>

[🌐 Live Demo](https://agentsannyii.vercel.app) • [📖 Documentation](./docs) • [🛠️ Create Tool](#create-tool)

</div>

---

<!-- Chinese Section -->
<div align="center">

## 🇨🇳 中文介绍

</div>

### ✨ 项目简介

**AgentSannyii** 是一个基于 **极光梦境 (Aurora Dream)** 主题的 AI 工具平台。每个工具都是一个独立的 HTML 文件，可以完全离线运行，无需安装任何软件或依赖。

> 🎯 **核心理念**: 每个微小的问题，用一个 HTML 文件解决。

### 🌟 主要特性

| 特性 | 描述 |
|------|------|
| 🎨 **极光梦境 UI** | 科幻感十足的深色主题，动态粒子背景，极光配色 |
| 📱 **单文件工具** | 每个工具都是独立的 HTML，下载即用 |
| 🔌 **完全离线** | 无需网络，浏览器打开即可使用 |
| 🛠️ **AI 生成** | 通过自然语言描述自动生成自定义工具 |
| 📦 **零依赖** | 不依赖任何外部 CDN 或库 |
| 🎭 **动效丰富** | GSAP + Framer Motion 打造电影级动效 |

### 🚀 快速开始

#### 在线使用
访问 [https://agentsannyii.vercel.app](https://agentsannyii.vercel.app) 浏览所有工具。

#### 本地运行
```bash
# 克隆仓库
git clone https://github.com/sannyii/AgentSannyii.git
cd AgentSannyii

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问 http://localhost:3000
```

#### 下载工具离线使用
1. 访问任意工具页面 (如 `/tool/text-cleaner`)
2. 点击 **Download HTML** 按钮
3. 下载的 HTML 文件可以在任何浏览器中打开，无需网络

### 📁 项目结构

```
AgentSannyii/
├── src/
│   ├── app/                 # Next.js 应用路由
│   │   └── tool/[id]/       # 工具详情页
│   ├── components/          # React 组件
│   │   ├── backgrounds/     # 背景特效组件
│   │   └── sections/        # 页面区块组件
│   ├── lib/                 # 工具函数
│   └── data/                # 数据定义
├── public/
│   └── tools/               # 工具 HTML 文件
│       ├── __TEMPLATE__.html   # 工具模板
│       ├── text-cleaner.html   # 文本清理工具
│       └── meta.json           # 工具元数据
└── docs/                    # 项目文档
    ├── ARCHITECTURE.md      # 架构设计
    └── GENERATOR_DESIGN.md  # 生成器设计
```

### 🛠️ 创建新工具

#### 方式一：基于模板
1. 复制 `public/tools/__TEMPLATE__.html`
2. 修改模板内容实现功能
3. 在 `public/tools/meta.json` 中添加工具信息
4. 重新部署

#### 方式二：AI 生成 (即将推出)
访问 `/create` 页面，通过自然语言描述自动生成工具。

### 🤝 贡献指南

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

<!-- English Section -->
<div align="center">

## 🇺🇸 English Introduction

</div>

### ✨ Project Overview

**AgentSannyii** is an AI utilities platform featuring the **Aurora Dream** theme. Each utility is a standalone HTML file that runs completely offline without installing any software or dependencies.

> 🎯 **Core Philosophy**: Every tiny problem, solved with a single HTML file.

### 🌟 Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **Aurora Dream UI** | Sci-fi inspired dark theme with dynamic particle background and aurora color palette |
| 📱 **Single-File Utility** | Each tool is an independent HTML file, download and use instantly |
| 🔌 **Fully Offline** | No internet required, works directly in your browser |
| 🛠️ **AI Generation** | Generate custom tools through natural language descriptions |
| 📦 **Zero Dependencies** | No external CDN or library dependencies |
| 🎭 **Rich Animations** | Cinematic animations powered by GSAP + Framer Motion |

### 🚀 Quick Start

#### Use Online
Visit [https://agentsannyii.vercel.app](https://agentsannyii.vercel.app) to browse all utilities.

#### Run Locally
```bash
# Clone the repository
git clone https://github.com/sannyii/AgentSannyii.git
cd AgentSannyii

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

#### Download for Offline Use
1. Visit any tool page (e.g., `/tool/text-cleaner`)
2. Click the **Download HTML** button
3. The downloaded HTML file works in any browser without internet

### 📁 Project Structure

```
AgentSannyii/
├── src/
│   ├── app/                 # Next.js app router
│   │   └── tool/[id]/       # Tool detail pages
│   ├── components/          # React components
│   │   ├── backgrounds/     # Background effect components
│   │   └── sections/        # Page section components
│   ├── lib/                 # Utility functions
│   └── data/                # Data definitions
├── public/
│   └── tools/               # Tool HTML files
│       ├── __TEMPLATE__.html   # Tool template
│       ├── text-cleaner.html   # Text cleaner utility
│       └── meta.json           # Tool metadata
└── docs/                    # Documentation
    ├── ARCHITECTURE.md      # Architecture design
    └── GENERATOR_DESIGN.md  # Generator design
```

### 🛠️ Create a New Tool

#### Method 1: Based on Template
1. Copy `public/tools/__TEMPLATE__.html`
2. Modify the template to implement your functionality
3. Add tool information to `public/tools/meta.json`
4. Redeploy

#### Method 2: AI Generation (Coming Soon)
Visit the `/create` page and generate tools through natural language descriptions.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<!-- Shared Footer -->
<div align="center">

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 💖 Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

<p align="center">
  <sub>Built with 💜 by <a href="https://github.com/sannyii">@sannyii</a></sub>
</p>

</div>

<!-- 
📸 Screenshots to add:
1. Replace hero banner with actual project screenshot/GIF
2. Add tool preview screenshots
3. Add mobile responsive screenshots

Recommended tools for screenshots:
- Screen Studio (for GIFs)
- CleanShot X (for macOS)
- ShareX (for Windows)
-->
