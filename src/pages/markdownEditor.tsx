import { Box, Input, styled, Typography } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const pink = "#ffc4dd";
const midnightBlue = "#1a1d38";

const ParagraphWithCode = styled("p")(() => ({
  whiteSpace: "pre-wrap",
  "& code": {
    backgroundColor: midnightBlue,
    padding: ".2em .4em",
    borderRadius: "4px",
  },
}));

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [editType, setEditType] = useState("text");

  return (
    <>
      <div>
        <div className={"custom-background absolute -z-10 h-screen w-full"} />
        <div className={"background-border"} />

        <Box height={"100vh"} width={"90vw"} className={`p-16 mx-auto`}>
          <Input
            sx={{
              width: "100%",
              fontSize: "2rem",
              color: "white",
            }}
            disableUnderline
            value={title}
            className="text-2xl font-bold p-4"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />

          <Box
            width={"auto"}
            bgcolor={"transparent"}
            overflow={"hidden"}
            borderRadius={"10px"}
            position={"relative"}
          >
            <Box
              display="flex"
              width={"100%"}
              height={"80vh"}
              border={"none"}
              color={"#fff"}
            >
              <Editor
                markdown={markdown}
                onChange={(markDown) => setMarkdown(markDown)}
                editType={editType}
              />
              <MarkdownPreview editType={editType} markdown={markdown} />
            </Box>

            <ToggleButton
              editType={editType}
              onClick={() =>
                setEditType((prev) => (prev === "text" ? "preview" : "text"))
              }
            />
          </Box>
        </Box>
      </div>
    </>
  );
}

const Editor = ({
  markdown,
  onChange,
  editType,
}: {
  markdown: string;
  onChange: (markdown: string) => void;
  editType: string;
}) => {
  return (
    <Box
      position={"absolute"}
      sx={{
        width: "100%",
        opacity: editType === "text" ? "1" : "0",
        zIndex: editType === "text" ? 1 : 0,
        transition: "0.5s",
      }}
    >
      <textarea
        className="w-full p-4 h-[80vh]"
        style={{
          outline: "none",
          resize: "none",
        }}
        rows={10}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ここに Markdown を入力..."
      />
    </Box>
  );
};

const MarkdownPreview = ({
  editType,
  markdown,
}: {
  editType: string;
  markdown: string;
}) => {
  return (
    <Box
      position={"absolute"}
      overflow={"auto"}
      sx={{
        width: "100%",
        opacity: editType === "text" ? "0" : "1",
        zIndex: editType === "text" ? 0 : 1,
        transition: "0.5s",
      }}
    >
      <Box height={"80vh"} className="p-4 rounded-md">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <Typography
                variant="h1"
                paddingBottom=".2em"
                fontSize="1.7em"
                borderBottom={`1px solid ${pink}`}
              >
                {children}
              </Typography>
            ),
            h2: ({ children }) => (
              <Typography
                variant="h2"
                paddingTop="2.3em"
                paddingBottom=".3em"
                fontSize="1.5em"
                borderBottom={`1px solid ${pink}`}
              >
                {children}
              </Typography>
            ),
            h3: ({ children }) => (
              <Typography
                variant="h3"
                paddingTop="2.25em"
                paddingBottom=".5em"
                fontSize="1.3em"
              >
                {children}
              </Typography>
            ),
            h4: ({ children }) => (
              <Typography
                variant="h4"
                paddingTop="2.25em"
                paddingBottom=".5em"
                fontSize="1.1em"
              >
                {children}
              </Typography>
            ),
            h5: ({ children }) => (
              <Typography
                variant="h5"
                paddingTop="2.25em"
                paddingBottom=".5em"
                fontSize="1em"
              >
                {children}
              </Typography>
            ),
            h6: ({ children }) => (
              <Typography
                variant="h5"
                paddingTop="2.25em"
                paddingBottom=".5em"
                fontSize="0.9em"
              >
                {children}
              </Typography>
            ),
            p: ({ children }) => (
              <ParagraphWithCode>{children}</ParagraphWithCode>
            ),
            strong: ({ children }) => (
              <strong className="text-green-500">{children}</strong>
            ),
            ul: ({ children }) => (
              <Box
                paddingLeft="1.8em"
                component="ul"
                className="list-disc list-inside"
              >
                {children}
              </Box>
            ),
            ol: ({ children }) => (
              <Box
                paddingLeft="1.8em"
                component="ol"
                className="list-decimal list-inside"
              >
                {children}
              </Box>
            ),
            li: ({ children }) => <Box component="li">{children}</Box>,
            blockquote: ({ children }) => (
              <Box
                fontSize={"0.9em"}
                margin={"1.4em 0"}
                borderLeft={`3px solid ${pink}`}
                padding={"2px 0 .2px .7em"}
                component="blockquote"
              >
                {children}
              </Box>
            ),
            pre: ({ children }) => (
              <Box
                component="pre"
                margin={"1.3rem 0"}
                padding={"1em"}
                bgcolor={midnightBlue}
                color={"#fff"}
                borderRadius={"5px"}
              >
                {children}
              </Box>
            ),
            hr: () => (
              <Box
                component={"hr"}
                borderTop={`2px solid ${pink}`}
                margin={"2.5rem 0"}
              />
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                {children}
              </a>
            ),
            table: ({ children }) => (
              <Box
                component="table"
                width="auto"
                margin="1.2rem auto"
                fontSize={"0.95em"}
                lineHeight={"1.5"}
                display={"block"}
              >
                {children}
              </Box>
            ),
            th: ({ children }) => (
              <Box
                component="th"
                padding=".5em"
                textAlign="center"
                border={`1px solid ${pink}`}
                color={pink}
              >
                {children}
              </Box>
            ),
            td: ({ children }) => (
              <Box
                component="td"
                padding=".5em"
                textAlign="center"
                border={`1px solid ${pink}`}
              >
                {children}
              </Box>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};

const ToggleButton = ({
  editType,
  onClick,
}: {
  editType: string;
  onClick: () => void;
}) => {
  return (
    <Box position={"absolute"} bottom={20} right={20} onClick={() => onClick()}>
      <Box>
        <Box
          style={{
            position: "absolute",
            content: "",
            transition: "all .25s",
            width: "35px",
            height: "35px",
            background: pink,
            border: `5px solid ${midnightBlue}`,
            borderRadius: "50%",
            top: "50%",
            left: editType === "text" ? "0" : "calc(100% - 35px)",
            transform: "translateY(-50%)",
            zIndex: "10",
          }}
        />

        <input
          type="checkbox"
          style={{
            appearance: "none",
            width: "100px",
            height: "8px",
            background: pink,
            borderRadius: "5px",
            position: "relative",
            outline: 0,
            cursor: "pointer",
          }}
        />
        <Box
          style={{
            position: "absolute",
            content: "",
            transition: "all .25s",
            width: "25px",
            height: "25px",
            background: pink,
            borderRadius: "50%",
            top: "50%",
            left: editType === "text" ? "10px" : "left: 75px;",
            transform:
              "scale(1) translateY(-50%)" + editType === "text"
                ? ""
                : "scale(0)",
            transformOrigin: "50% 50%",
          }}
        />
      </Box>
    </Box>
  );
};
