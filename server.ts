import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const db = new Database("database.sqlite");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT, -- notice, product, portfolio
    title TEXT,
    content TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );
`);

// Seed initial data
const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
insertSetting.run("site_name", "승민산업벤딩");
insertSetting.run("primary_color", "#3b82f6"); // Blue-500
insertSetting.run("bg_color", "#000000");
insertSetting.run("hero_title", "최고의 기술력, 완벽한 벤딩 솔루션");
insertSetting.run("hero_subtitle", "승민산업벤딩은 파이프 벤딩 및 기계 제작 분야의 선두주자입니다.");
insertSetting.run("seo_title", "승민산업벤딩 - 벤딩기계 및 가공 전문");
insertSetting.run("seo_description", "벤딩기계 제작 및 파이프 벤딩 가공 전문 업체 승민산업벤딩입니다.");

// New settings
insertSetting.run("company_phone", "010-1234-5678");
insertSetting.run("company_email", "contact@smbending.com");
insertSetting.run("company_address", "경기도 시흥시 산기대학로 237");
insertSetting.run("logo_url", ""); 

// Social media links
insertSetting.run("instagram_url", "");
insertSetting.run("facebook_url", "");
insertSetting.run("youtube_url", "");

insertSetting.run("service1_title", "파이프 벤딩");
insertSetting.run("service1_desc", "정밀한 각도와 곡률을 구현하는 고성능 파이프 벤딩 가공 서비스를 제공합니다.");
insertSetting.run("service1_img", "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800");

insertSetting.run("service2_title", "벤딩기계 제작");
insertSetting.run("service2_desc", "산업 현장에 최적화된 맞춤형 벤딩 기계를 설계하고 제작합니다.");
insertSetting.run("service2_img", "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800");

insertSetting.run("service3_title", "금속 구조물 가공");
insertSetting.run("service3_desc", "복잡한 금속 구조물의 벤딩 및 용접, 정밀 가공 솔루션을 지원합니다.");
insertSetting.run("service3_img", "https://images.unsplash.com/photo-1565608087341-404b254587c3?auto=format&fit=crop&q=80&w=800");

const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("sm4798", "1806322");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/settings", (req, res) => {
    const rows = db.prepare("SELECT * FROM settings").all() as { key: string, value: string }[];
    const settings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
    res.json(settings);
  });

  app.post("/api/settings", (req, res) => {
    const { settings } = req.body;
    const update = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        update.run(key, value);
      }
    });
    transaction(settings);
    res.json({ success: true });
  });

  app.get("/api/posts", (req, res) => {
    const { type } = req.query;
    let posts;
    if (type) {
      posts = db.prepare("SELECT * FROM posts WHERE type = ? ORDER BY created_at DESC").all(type);
    } else {
      posts = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
    }
    res.json(posts);
  });

  app.post("/api/posts", (req, res) => {
    const { type, title, content, image_url } = req.body;
    const result = db.prepare("INSERT INTO posts (type, title, content, image_url) VALUES (?, ?, ?, ?)").run(type, title, content, image_url);
    res.json({ id: result.lastInsertRowid });
  });

  app.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    db.prepare("UPDATE posts SET title = ?, content = ?, image_url = ? WHERE id = ?").run(title, content, image_url, id);
    res.json({ success: true });
  });

  app.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM posts WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) {
      res.json({ success: true, user: { username: (user as any).username } });
    } else {
      res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 올바르지 않습니다." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
