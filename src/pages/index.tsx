import { useState } from 'react';
import { Inter } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RandomTask from '@/components/RandomTask';
import { Tasks, Task } from '@/interfaces/tasks';
import { parseMarkdownToStructuredObjects } from '../utils/parseMarkdown';
import fs from 'fs';
import path from 'path';
import GeneratedTask from '@/components/GeneratedTask';
import Container from '@/components/Container';

export async function getStaticProps() {
	const markdownFilePath = path.join(process.cwd(), 'public/data/tasks.md');
	const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');

	const tasks = await parseMarkdownToStructuredObjects(markdownContent);

	for (let i = 0; i < tasks.length; i++) {
		tasks[i].index = i;
	}

	return {
		props: {
			tasks,
		},
	};
}

interface HomeProps {
	tasks: Tasks;
}

export default function Home({ tasks }: HomeProps) {
	const [selection, setSelection] = useState('');

	return (
		<>
			<Head>
				<title>Artistic Alchemy</title>
				<meta name="description" content="A source of inspiration for your creative journey." key="description" />
				<meta property="og:title" content="Artistic Alchemy" key="title" />
				<meta
					property="og:description"
					content="A source of inspiration for your creative journey."
					key="og-description"
				/>
				<meta
					property="og:image"
					content="https://artistic-alchemy-prompts.vercel.app/opengraph-image.png"
					key="og-image"
				/>
				<link rel="icon" href="https://artistic-alchemy-prompts.vercel.app/favicon.ico" />
			</Head>
			<Container>
				<div className="p-4 flex overflow-scroll flex-col gap-8 min-h-screen w-prose max-w-prose mx-auto">
					<Header />
					{selection === '' || selection === 'task' ? <RandomTask tasks={tasks} setSelection={setSelection} /> : null}
					{selection === '' || selection === 'ai' ? <GeneratedTask setSelection={setSelection} /> : null}
					<Footer />
				</div>
			</Container>
		</>
	);
}
