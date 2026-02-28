import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// 获取当前目录路径（ESM 中没有 __dirname）
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 读取文件（路径请根据实际位置调整）
const filePath = path.resolve(__dirname, './A.json');
const sourceData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 排除掉自带的 $schema 键，只校验业务 key
const keys = Object.keys(sourceData).filter(key => key !== '$schema');

const schema = {
	// "$schema": "http://json-schema.org",
	"type": "object",
	"properties": {
		// 允许 $schema 字段存在但不限制内容，或者直接忽略
		"$schema": { "type": "string" },
		...Object.fromEntries(keys.map(key => [key, { "type": "string" }]))
	},
	"required": keys, // 这里不包含 $schema，所以它是可选的
	"additionalProperties": false
};

fs.writeFileSync(path.resolve(__dirname, './schema.json'), JSON.stringify(schema, null, 2));
console.log('✅ Schema 同步成功！');
