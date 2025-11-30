const fs = require("fs");
const path = require("path");

// Копируем Prisma Query Engine для Netlify в несколько мест
const enginePath = path.join(
  __dirname,
  "../src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
);

// Проверяем альтернативные пути, где может быть engine
const possibleEnginePaths = [
  enginePath,
  path.join(
    __dirname,
    "../node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node"
  ),
  path.join(
    __dirname,
    "../node_modules/@prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node"
  ),
];

let foundEnginePath = null;
for (const possiblePath of possibleEnginePaths) {
  if (fs.existsSync(possiblePath)) {
    foundEnginePath = possiblePath;
    console.log(`✅ Found Prisma Query Engine at: ${possiblePath}`);
    break;
  }
}

if (!foundEnginePath) {
  console.warn("⚠️  Prisma Query Engine not found. Searched paths:");
  possibleEnginePaths.forEach((p) => console.warn(`   - ${p}`));
  process.exit(0); // Не падаем, если engine не найден (может быть в другом месте)
}

const copyTargets = [
  path.join(__dirname, "../.next/server/chunks"),
  path.join(__dirname, "../.next/server"),
  path.join(__dirname, "../src/generated/prisma"),
  path.join(__dirname, "../.next/standalone/.next/server/chunks"), // Для standalone сборки
];

copyTargets.forEach((targetPath) => {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
  const destPath = path.join(
    targetPath,
    "libquery_engine-rhel-openssl-3.0.x.so.node"
  );
  try {
    fs.copyFileSync(foundEnginePath, destPath);
    console.log(`✅ Prisma Query Engine copied to ${targetPath}`);
  } catch (error) {
    console.warn(`⚠️  Failed to copy to ${targetPath}:`, error.message);
  }
});
