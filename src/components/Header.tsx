import Link from 'next/link';

export default function Header() {
	return (
		<div className="flex gap-8 mt-4 w-full flex-col">
			<div className="text-3xl md:text-4xl">
				<h1>
					Artistic Alchemy
					{/* ⊹ ۪ 𖥔 ˑ ִ ֗ ִ ۫ ˑ⊹ ۪ ﾟ｡⋆ */}
				</h1>
				<h2>
					A source of inspiration for your creative journey
					{/* ִ ֗ ִ ۫ ˑ｡𖥔 ˑ ִ ֗*/}
				</h2>
				<h2 className="">
					<span className="">(∩ᵔ ᵕ ᵔ )⊃</span>
					<span className="">━</span>
					<span className="">☆</span>
					<span className="">·.* +. *･</span>
				</h2>
			</div>
			<div className="flex flex-col gap-4">
				<p>
					Supplement your Morning Pages by revisiting the tasks in Julia Cameron&apos;s{' '}
					<i className="italic">The Artist&apos;s Way</i>—or spark your imagination with ⊹magically-generated⊹ prompts.
					Let your daily creative practice become an enchanting exploration.
				</p>
			</div>
		</div>
	);
}
