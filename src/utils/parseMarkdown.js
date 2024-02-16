import { remark } from 'remark';
import html from 'remark-html';

const extractDataFromChunk = (chunk, index) => {
	// Example logic to extract data; this needs to be adapted based on your actual Markdown structure
	const heading2Match = chunk.match(/<h2>(.*?)<\/h2>/);
	const heading3Match = chunk.match(/<h3>(.*?)<\/h3>/);
	const descriptionHtml = chunk.split(/<\/h3>/)[1]?.trim(); // Everything after the third-level heading

	return {
		task: heading2Match ? heading2Match[1] : '',
		week: heading3Match ? heading3Match[1] : '',
		description: descriptionHtml || '',
		index: index || null,
	};
};

export async function parseMarkdownToStructuredObjects(markdownContent) {
	const processedContent = await remark().use(html).process(markdownContent);
	const contentHtml = processedContent.toString();

	// Split the content by second-level headings to create initial chunks
	const rawChunks = contentHtml
		.split('<h2>')
		.slice(1)
		.map((chunk) => '<h2>' + chunk);

	// Further process each chunk to extract structured data
	const structuredChunks = rawChunks.map(extractDataFromChunk);

	return structuredChunks;
}
