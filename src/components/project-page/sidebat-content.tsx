import localFont from "next/font/local";

export const belmonte = localFont({
  src: "../../../public/fonts/belmonte_ballpoint.otf",
  variable: "--font-belmonte_ballpoint",
  display: "swap",
});

export type metadataBlockType = {
  type: "metadata";
  id: string;
  name: string;
  title: string;
  activeState: string;
  fontActiveState: string;
};

export type contentBlockType =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      ordered?: boolean;
      items: string[];
    };

export type Section = {
  title: string;
  content: contentBlockType[];
};

export type blockType = metadataBlockType | Section;

// Type guard function
function isMetadataBlock(block: blockType): block is metadataBlockType {
  return "type" in block && block.type === "metadata";
}

export function SidebarCardContent({ blocks }: { blocks: blockType[] }) {
    let textColor = "";
  return (
    <div className="flex flex-col pb-25">
      {blocks.map((block, i) => {
        if (isMetadataBlock(block)) {
            textColor = block.fontActiveState;
            return null;
        }

        // It's a Section
        return (
          <div key={i} className="flex flex-col">
            <h4 
                style={{color: textColor}}
                className={`${belmonte.className} text-2xl pl-2 pt-5 pb-2.5`}
            >
                {block.title}
            </h4>

            {block.content.map((contentBlock, j) => {
              if (contentBlock.type === "paragraph") {
                return (
                  <p key={j} className="text-sm leading-5 pl-2">
                    {contentBlock.text}
                  </p>
                );
              }

              if (contentBlock.type === "list") {
                const ListTag = contentBlock.ordered ? "ol" : "ul";
                return (
                  <ListTag
                    key={j}
                    className={`text-sm leading-5 ${
                      contentBlock.ordered
                        ? "list-decimal list-inside"
                        : "list-disc list-inside pl-4"
                    }`}
                  >
                    {contentBlock.items.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ListTag>
                );
              }

              return null;
            })}
          </div>
        );
      })}
    </div>
  );
}
