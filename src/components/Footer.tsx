import Link from 'next/link';

export default function Header() {
	return (
		<div className="flex gap-4 w-full flex-col mb-4 text-neutral-500">
			<p className="my-8">
				<i>
					&quot;The road is never straight. Growth is a spiral process, doubling back on itself, reasessing and
					regrouping.&quot;
				</i>
			</p>
			<h2 className="text-3xl md:text-4xl">Basic Principles</h2>
			<ul className="list-disc list-outside ml-5 gap-4 flex flex-col">
				<li>Creativity is the natural order of life. Life is energy: pure creative energy.</li>
				<li>There is an underlying, in-dwelling creative force infusing all of life—including ourselves. </li>
				<li>
					When we open ourselves to our creativity, we open ourselves to the creator’s creativity within us and our
					lives.
				</li>
				<li>
					We are, ourselves, creations. And we, in turn, are meant to continue creativity by being creative ourselves.{' '}
				</li>
				<li>Creativity is God’s gift to us. Using our creativity is our gift back to God. </li>
				<li>The refusal to be creative is self-will and is counter to our true nature. </li>
				<li>When we open ourselves to exploring our creativity, we open ourselves to God: good orderly direction. </li>
				<li>As we open our creative channel to the creator, many gentle but powerful changes are to be expected. </li>
				<li>It is safe to open ourselves up to greater and greater creativity. </li>
				<li>
					Our creative dreams and yearnings come from a divine source. As we move toward our dreams, we move toward our
					divinity.”
				</li>
			</ul>
			<div className="w-full py-4 text-center text-2xl text-white">
				<span>⋆˖⁺‧₊⊹◯⊹₊‧⁺˖⋆</span>
			</div>
		</div>
	);
}
