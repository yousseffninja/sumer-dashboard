export type Block = {
    key: string | null;
    text: string;
    type: string;
    depth: number;
    inlineStyleRanges: InlineStyleRange[];
    entityRanges: any[];
    data: any;
};

export type InlineStyleRange = {
    offset: number;
    length: number;
    style: string;
};

export type BlockData = {
    blocks: Block[];
    entityMap: {};
};

export function jsonToHtml(blockData: BlockData): string {
    const blocks = blockData.blocks;

    const html = blocks
        .map((block) => {
            const text = block.text;
            const inlineStyles = block.inlineStyleRanges.map(
                (inlineStyle) => inlineStyle.style
            );

            let html = "";

            switch (block.type) {
                case "header-one":
                    html = `<h1>${text}</h1>`;
                    break;
                case "header-two":
                    html = `<h2>${text}</h2>`;
                    break;
                case "header-three":
                    html = `<h3>${text}</h3>`;
                    break;
                case "header-four":
                    html = `<h4>${text}</h4>`;
                    break;
                case "header-five":
                    html = `<h5>${text}</h5>`;
                    break;
                case "header-six":
                    html = `<h6>${text}</h6>`;
                    break;
                case "blockquote":
                    html = `<blockquote>${text}</blockquote>`;
                    break;
                case "code-block":
                    html = `<pre><code>${text}</code></pre>`;
                    break;
                case "unordered-list-item":
                    html = `<li>${text}</li>`;
                    break;
                case "ordered-list-item":
                    html = `<li>${text}</li>`;
                    break;
                default:
                    html = `<p>${text}</p>`;
            }

            if (inlineStyles.includes("BOLD")) {
                html = `<strong>${html}</strong>`;
            }

            if (inlineStyles.includes("ITALIC")) {
                html = `<em>${html}</em>`;
            }

            if (inlineStyles.includes("UNDERLINE")) {
                html = `<u>${html}</u>`;
            }

            if (inlineStyles.includes("STRIKETHROUGH")) {
                html = `<del>${html}</del>`;
            }

            if (block.type === "code-block" && inlineStyles.includes("ITALIC")) {
                html = `<code>${text}</code>`;
            }

            return html;
        })
        .join("");

    return html;
}

export type Style = "BOLD" | "ITALIC" | "UNDERLINE" | "STRIKETHROUGH" | "CODE" | "HIGHLIGHT";


export function htmlToJson(html: string): BlockData {
    const div = document.createElement("div");
    div.innerHTML = html;

    const blockElements = div.querySelectorAll("[data-block=true]");

    const blocks: Block[] = [];

    for (let i = 0; i < blockElements.length; i++) {
        const blockElement = blockElements[i];

        const block: Block = {
            key: blockElement.getAttribute("data-key"),
            text: blockElement.textContent ?? "",
            type: blockElement.getAttribute("data-type") ?? "unstyled",
            depth: parseInt(blockElement.getAttribute("data-depth") ?? "0", 10),
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        };

        const styleElements = blockElement.querySelectorAll("[data-style=true]");

        for (let j = 0; j < styleElements.length; j++) {
            const styleElement = styleElements[j];

            const offset = parseInt(styleElement.getAttribute("data-offset") ?? "0", 10);
            const length = parseInt(styleElement.getAttribute("data-length") ?? "0", 10);
            const style = styleElement.getAttribute("data-style") as Style;

            block.inlineStyleRanges.push({ offset, length, style });
        }

        blocks.push(block);
    }

    const object = { blocks, entityMap: {} };
    return JSON.stringify(object) as any
}