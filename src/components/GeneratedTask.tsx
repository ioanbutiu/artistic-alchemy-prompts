import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getChatCompletion = async (prompt: string) => {
	try {
		const response = await fetch('/api/chat-gpt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt }),
		});
		if (!response.ok) {
			console.log(response);
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error('Fetch error:', error);
		return { error: error.message };
	}
};

export default function GeneratedTask({ setSelection }: any) {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState('');
	const [randomChars, setRandomChars] = useState([{}]);
	const [selectedColor, setSelectedColor] = useState('text-white');

	const characters = '✩₊˚.⋆⋆⁺₊✧✩₊˚.⋆⋆⁺₊✧.*･⋆⭑˚。⛥';

	const startingPointOptions = [
		'recover',
		'explore',
		'embrace',
		'ignite',
		'discover',
		'cultivate',
		'unleash',
		'enhance',
		'nurture',
		'inspire',
	];
	const senseOptions = [
		'strength',
		'creativity',
		'self-worth',
		'insight',
		'passion',
		'innovation',
		'courage',
		'mindfulness',
		'empathy',
		'clarity',
	];

	const [startingPoint, setStartingPoint] = useState(startingPointOptions[0]);
	const [sense, setSense] = useState(senseOptions[0]);

	const customPrompt = `Write a single short creative task inspired by Julia Cameron's The Artist's Way with this as a starting point: I want to ${startingPoint} a sense of ${sense}.`;
	const genericPrompt = `Write a single short creative task inspired by Julia Cameron's The Artist's Way.`;

	const generateTask = async (prompt: string) => {
		const container = document.getElementById('prompt-container');
		const height = container?.clientHeight;
		//@ts-ignore
		container.style.height = `${height}px`;
		setSelection('ai');
		setLoading(true); // Start loading
		const data = await getChatCompletion(prompt);
		if (data.response && data.response.choices && data.response.choices.length > 0) {
			setResponse(data.response.choices[0].message.content);
		} else {
			console.error('Unexpected response structure:', data);
		}
		//@ts-ignore
		container.style.height = 'auto';
		setLoading(false); // Stop loading
	};

	// useEffect(() => {
	// 	if (loading) {
	// 		const interval = setInterval(() => {
	// 			setRandomChars((chars) => {
	// 				// Create a new character object
	// 				const newChar = {
	// 					char: characters[Math.floor(Math.random() * characters.length)],
	// 					id: Math.random(),
	// 					top: `${Math.floor(Math.random() * 95)}%`,
	// 					left: `${Math.floor(Math.random() * 95)}%`,
	// 				};
	// 				let newChars = [...chars, newChar];
	// 				if (newChars.length > 40) {
	// 					newChars = newChars.slice(1);
	// 				}
	// 				return newChars;
	// 			});
	// 		}, 200);

	// 		return () => clearInterval(interval);
	// 	} else {
	// 		setRandomChars([]);
	// 	}
	// }, [loading, characters]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<div
			id="prompt-container"
			className="relative bg-[#121212] rounded-xl border-white border-dotted h-full place-self-stretch p-4 flex flex-col gap-4 overflow-scroll">
			{loading && (
				<>
					<span className={`animate-pulse ${selectedColor}`}>Invoking...</span>
					{/* @ts-ignore */}
					{/* {randomChars.map(({ char, id, top, left }) => (
						<motion.span
							key={id}
							initial={{ opacity: 1, scale: 0 }}
							animate={{ opacity: [1, 1, 1], scale: [0, 2, 0] }}
							transition={{ duration: 2, ease: 'easeOut' }}
							style={{ position: 'absolute', top, left }}
							className={`${selectedColor}`}>
							{char}
						</motion.span>
					))} */}
				</>
			)}

			{!loading && response === '' && (
				<motion.div
					key="prompt"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={containerVariants}
					className="flex flex-col gap-4 justify-start grow">
					<span>
						Use magic
						<span className="group inline-block relative">
							*{' '}
							<sup className="bg-white transition-colors inline-block group-hover:opacity-100 group-hover:text-white absolute whitespace-nowrap -top-1 left-0 text-black">
								Courtesy of ChatGPT
							</sup>
						</span>{' '}
						to create a new prompt:
					</span>
					<div className="flex flex-col border-green-500 text-green-500 gap-4 grow justify-center">
						<div className="flex flex-cols md:flex-row gap-2 flex-wrap">
							<div className="flex gap-2 w-full md:w-auto">
								<p className="whitespace-nowrap">I want to</p>
								<label className="grow">
									<select
										className="w-full border-green-500 border cursor-pointer px-1 bg-inherit hover:bg-green-500/20 rounded transition-colors"
										value={startingPoint}
										onChange={(e) => setStartingPoint(e.target.value)}>
										{startingPointOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</label>
							</div>
							<div className="flex gap-2 w-full md:w-auto">
								<p className="whitespace-nowrap">a sense of</p>
								<label className="grow">
									<select
										className="w-full border-green-500 rounded hover:bg-green-500/20 transition-colors border px-1 bg-inherit cursor-pointer"
										value={sense}
										onChange={(e) => setSense(e.target.value)}>
										{senseOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								</label>
							</div>
						</div>
						<button
							className="min-h-40 grow transition-colors rounded-xl border-green-500 hover:bg-green-500/20 border text-green-500 p-2 uppercase"
							onClick={() => {
								generateTask(customPrompt);
								setSelectedColor('text-green-500');
							}}>
							Conjure
						</button>
					</div>
					<div className="border-blue-400 text-blue-400 border-dotted flex flex-col gap-4 grow justify-center">
						{"I'm not sure what I'm looking for, but the universe will guide me."}
						<button
							className="min-h-40 grow transition-colors border hover:bg-blue-400/20 border-blue-400 rounded-xl p-2 uppercase"
							onClick={() => {
								generateTask(genericPrompt);
								setSelectedColor('text-blue-400');
							}}>
							{"I'm feeling lucky"}
						</button>
					</div>
				</motion.div>
			)}
			{!loading && response !== '' && (
				<motion.div
					key="prompt"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={containerVariants}
					className={`${selectedColor} whitespace-pre-wrap`}>
					{response}
				</motion.div>
			)}
		</div>
	);
}
