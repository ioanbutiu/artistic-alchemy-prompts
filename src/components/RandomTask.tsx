import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Tasks, Task } from '@/interfaces/tasks';

interface RandomTaskProps {
	tasks: Tasks;
	setSelection: any;
}

export default function RandomTask({ tasks, setSelection }: RandomTaskProps) {
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [randomChars, setRandomChars] = useState([{}]);

	const characters = '✩₊˚.⋆✦⋆⁺₊✧✩₊˚.⋆˖⋆⁺₊✧.*･⋆⭑˚。⛥';

	const handleButtonClick = () => {
		if (tasks.length > 0) {
			const container = document.getElementById('task-container');
			const height = container?.clientHeight;
			//@ts-ignore
			container.style.height = `${height}px`;
			setSelection('task');
			setIsLoading(true);
			setTimeout(() => {
				const randomIndex = Math.floor(Math.random() * tasks.length);
				setSelectedTask(tasks[randomIndex]);
				//@ts-ignore
				container.style.height = 'auto';
				setIsLoading(false);
			}, 4000);
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	// useEffect(() => {
	// 	if (isLoading) {
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
	// }, [isLoading, characters]);

	return (
		<div
			id="task-container"
			className={`bg-[#121212] place-self-stretch h-full border-dotted p-4 rounded-xl overflow-scroll flex flex-col gap-4 relative`}>
			{isLoading ? (
				//@ts-ignore
				<>
					<span className="animate-pulse text-purple-400">Invoking...</span>
					{/* @ts-ignore */}
					{/* {randomChars.map(({ char, id, top, left }) => (
						<motion.span
							key={id}
							initial={{ opacity: 1, scale: 0 }}
							animate={{ opacity: [1, 1, 1], scale: [0, 2, 0] }}
							transition={{ duration: 3, ease: 'easeOut' }}
							style={{ position: 'absolute', top, left }}
							className="text-purple-400">
							{char}
						</motion.span>
					))} */}
				</>
			) : // <motion.div key="loading" initial="hidden" animate="visible" exit="exit" variants={containerVariants}>

			// 	Loading...
			// </motion.div>
			!selectedTask ? (
				<motion.div
					key="prompt"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={containerVariants}
					className="flex flex-col gap-4 h-full">
					<div className="">
						Flip through <i>The Artist&apos;s Way</i> and find a prompt to stimulate your creativity. Have faith in the
						power of synchronicity:
					</div>
					<div className="border-purple-400 text-purple-400 border-dotted flex flex-col gap-4 grow justify-center place-self-stretch">
						<button
							className="min-h-40 transition-colors rounded-xl grow border border-purple-400 text-purple-400 hover:bg-purple-400/20 p-2 uppercase"
							onClick={handleButtonClick}>
							<span className="">Inspire Me</span>
						</button>
					</div>
				</motion.div>
			) : (
				<motion.div
					key="prompt"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={containerVariants}
					className="text-purple-400">
					{/* Task Nav */}
					{/* <div className=" absolute top-1 right-4">
							<button
								className="text-purple-400 self-center uppercase transition-colors text-2xl mr-4"
								onClick={() => {
									if (selectedTask.index > 0) {
										setSelectedTask(tasks[selectedTask.index - 1]);
									}
								}}>
								←
							</button>

							<button
								className="text-purple-400 self-center uppercase transition-colors text-2xl"
								onClick={() => {
									if (selectedTask.index < tasks.length - 1) {
										setSelectedTask(tasks[selectedTask.index + 1]);
									}
								}}>
								→
							</button>
						</div> */}
					<h3 className="text-sm uppercase">{selectedTask.week}</h3>
					<h2 className="pt-8 pb-4 text-4xl">{selectedTask.task}</h2>
					<div className="task-description" dangerouslySetInnerHTML={{ __html: selectedTask.description }} />
				</motion.div>
			)}
		</div>
	);
}
