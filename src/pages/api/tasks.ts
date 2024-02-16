import path from 'path';
import fs from 'fs';

const filePath = path.join(process.cwd(), 'src', 'public', 'tasks.json');

export default function handler() {
	const jsonData = fs.readFileSync(filePath, 'utf-8');
	const tasks = JSON.parse(jsonData);

	for (let i = 0; i < tasks.length; i++) {
		tasks[i].index = i;
	}

	return tasks;
}
