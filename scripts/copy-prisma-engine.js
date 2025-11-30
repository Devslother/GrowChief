const fs = require("fs");
const path = require("path");

// Копируем Prisma Query Engine для Netlify
const enginePath = path.join(
  __dirname,
  "../src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
);
const outputPath = path.join(__dirname, "../.next/server/chunks");

if (fs.existsSync(enginePath)) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const destPath = path.join(
    outputPath,
    "libquery_engine-rhel-openssl-3.0.x.so.node"
  );
  fs.copyFileSync(enginePath, destPath);
  console.log("✅ Prisma Query Engine copied to .next/server/chunks");
} else {
  console.warn("⚠️  Prisma Query Engine not found at:", enginePath);
}
