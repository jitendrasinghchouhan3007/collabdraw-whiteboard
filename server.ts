import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./src/db.ts";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '50mb' }));

  // Auth
  app.post("/api/auth/login", (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Username is required" });
    const normalized = username.toLowerCase().trim();
    let user = db.prepare("SELECT * FROM users WHERE username = ?").get(normalized) as any;
    if (!user) {
      const result = db.prepare("INSERT INTO users (username) VALUES (?)").run(normalized);
      user = { id: result.lastInsertRowid, username: normalized };
    }
    res.json(user);
  });

  // Projects
  app.get("/api/projects", (req, res) => {
    const userId = req.query.userId;
    const projects = db.prepare(`
      SELECT p.*, u.username as owner_name FROM projects p
      JOIN users u ON p.owner_id = u.id
      WHERE p.owner_id = ? OR p.id IN (SELECT project_id FROM project_shares WHERE user_id = ?)
      ORDER BY p.created_at DESC
    `).all(userId, userId);
    res.json(projects);
  });

  app.post("/api/projects", (req, res) => {
    const { name, description, ownerId } = req.body;
    const result = db.prepare("INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)")
      .run(name, description, ownerId);
    res.json({ id: result.lastInsertRowid, name });
  });

  app.delete("/api/projects/:id", (req, res) => {

    const { id } = req.params;
    const { userId } = req.body;

    const project = db.prepare(
      "SELECT owner_id FROM projects WHERE id = ?"
    ).get(id) as any;

    // Only owner can delete
    if (!project || project.owner_id !== Number(userId)) {
      return res.status(403).json({ error: "Only owner can delete project" });
    }

    // Delete whiteboards inside the project
    db.prepare(
      "DELETE FROM whiteboards WHERE project_id = ?"
    ).run(id);

    // Delete shared users
    db.prepare(
      "DELETE FROM project_shares WHERE project_id = ?"
    ).run(id);

    // Delete project
    db.prepare(
      "DELETE FROM projects WHERE id = ?"
    ).run(id);

    res.json({ success: true });

  });

  app.post("/api/projects/:id/share", (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    const targetUser = db.prepare("SELECT id FROM users WHERE username = ?").get(username.toLowerCase().trim()) as any;
    if (!targetUser) return res.status(404).json({ error: "User not found" });
    db.prepare("INSERT OR IGNORE INTO project_shares (project_id, user_id) VALUES (?, ?)").run(id, targetUser.id);
    res.json({ success: true });
  });

  // Whiteboards
  app.get("/api/projects/:projectId/whiteboards", (req, res) => {
    const whiteboards = db.prepare("SELECT * FROM whiteboards WHERE project_id = ?").all(req.params.projectId);
    res.json(whiteboards);
  });

  app.post("/api/projects/:projectId/whiteboards", (req, res) => {
    const result = db.prepare("INSERT INTO whiteboards (project_id, name) VALUES (?, ?)").run(req.params.projectId, req.body.name);
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/whiteboards/:id", (req, res) => {
    res.json(db.prepare("SELECT * FROM whiteboards WHERE id = ?").get(req.params.id));
  });

  app.put("/api/whiteboards/:id", (req, res) => {
    db.prepare("UPDATE whiteboards SET state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(JSON.stringify(req.body.state), req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/whiteboards/:id", (req, res) => {
    db.prepare("DELETE FROM whiteboards WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve built frontend
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  app.listen(PORT, "0.0.0.0", () => console.log(`Server: http://localhost:${PORT}`));
}
startServer();