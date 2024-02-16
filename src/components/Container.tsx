import { useState } from 'react';
import { motion } from 'framer-motion';

const characters = '✩₊˚.⋆✦⋆⁺₊✧✩₊˚.⋆˖⋆⁺₊✧.*･⋆⭑˚。⛥✺';
const MAX_TRAIL_LENGTH = 80;

const getRandomCharacter = () => {
	const randomIndex = Math.floor(Math.random() * characters.length);
	return characters[randomIndex];
};

type Props = {
	children?: React.ReactNode;
};

export default function Container({ children }: Props) {
	const [trail, setTrail] = useState<Array<any>>([]);
	const [lastCalled, setLastCalled] = useState(0);
	const [throttleRate] = useState(50); // Adjust throttle rate as needed

	const handleMouseMove = (e: any) => {
		const currentTime = Date.now();
		if (currentTime - lastCalled > throttleRate) {
			const { clientX, clientY } = e;
			setTrail((prevTrail) => {
				const updatedTrail = [...prevTrail, { x: clientX, y: clientY, id: Math.random(), char: getRandomCharacter() }];
				return updatedTrail.slice(-MAX_TRAIL_LENGTH); // Keep only the last MAX_TRAIL_LENGTH items
			});
			setLastCalled(currentTime);
			//const updatedTrail = [...trail];
			//updatedTrail.push({ x: clientX, y: clientY, id: Math.random(), char: getRandomCharacter() });
			//setTrail(updatedTrail.slice(-MAX_TRAIL_LENGTH));
			//setTrail((prevTrail) => [...prevTrail, { x: clientX, y: clientY, id: Math.random() }]);
			//setLastCalled(currentTime);
		}
	};

	return (
		<div className="w-full min-h-screen" onMouseMove={handleMouseMove}>
			{trail.map(({ x, y, id, char }) => (
				<motion.span
					key={id}
					initial={{ opacity: 1, y: -20, rotate: Math.random() * 360 }}
					animate={{ opacity: 0, y: '30vh', rotate: 360 }}
					transition={{ duration: 2, ease: 'easeIn' }}
					style={{ position: 'fixed', left: x, top: y, fontSize: '24px' }}
					className="pointer-events-none text-white mix-blend-difference z-50">
					{char}
				</motion.span>
			))}
			{children}
		</div>
	);
}
