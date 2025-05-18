// list-files.js
const fs = require("fs");
const path = require("path");

const EXCLUDED_DIRS = ["node_modules", ".git"]; // можешь добавить другие

function walk(dir, indent = "") {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (EXCLUDED_DIRS.includes(file)) continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    console.log(indent + (stat.isDirectory() ? "📁 " : "📄 ") + file);

    if (stat.isDirectory()) {
      walk(fullPath, indent + "  ");
    }
  }
}

walk(".");
