//src/pages/api/chat-gpt.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const prompt = req.body.prompt;
	try {
		const chatCompletion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: prompt }],
			model: 'gpt-3.5-turbo',
		});

		res.status(200).json({ response: chatCompletion });
	} catch (error) {
		console.error('OpenAI error:', error);
		res.status(500).json({ error: 'Failed to fetch completion from OpenAI' });
	}
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	const prompt = req.body.prompt;
// 	const chatCompletion = await openai.chat.completions.create({
// 		messages: [{ role: 'user', content: prompt }],
// 		model: 'gpt-3.5-turbo',
// 	});

// 	res.status(200).json({ response: chatCompletion });
// }
