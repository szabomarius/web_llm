# Transformers.js Chat

A modern AI chat interface that runs entirely in your browser using [Transformers.js](https://huggingface.co/docs/transformers.js). No server required - the AI model downloads and runs locally using WebGPU acceleration.

## Features

- 🤖 **Local AI Model**: Uses HuggingFace's SmolLM2-1.7B-Instruct model
- 🚀 **WebGPU Acceleration**: Fast inference directly in your browser
- 💬 **Conversational Interface**: Maintains conversation history and context
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔄 **Real-time Streaming**: See responses as they're generated
- 🧠 **Thinking Display**: Toggle to see the AI's reasoning process
- ⌨️ **Keyboard Shortcuts**: Press `⌘+E` (Mac) or `Ctrl+E` (Windows/Linux) to toggle chat

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- A modern browser with WebGPU support (Chrome 113+, Edge 113+, or Firefox with WebGPU enabled)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/szabomarius/web_llm.git
    cd web_llm
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:5173`

### First Run

On your first visit, the app will download the AI model (~1.5GB). This happens automatically and only needs to be done once - the model is cached in your browser for future use.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues

## Usage

1. **Open the chat**: Press `⌘+E` (Mac) or `Ctrl+E` (Windows/Linux) to toggle the chat drawer
2. **Start chatting**: Type your message and press Enter or click Send
3. **View AI reasoning**: Click "Show Thinking" to see the AI's thought process (depends on the model)
4. **Copy responses**: Click the copy button on any message to copy it to clipboard

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **AI**: Transformers.js + HuggingFace SmolLM2-1.7B-Instruct
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier + Conventional Commits

## Browser Compatibility

This app requires WebGPU support for optimal performance:

- ✅ Chrome 113+
- ✅ Edge 113+
- ✅ Firefox (with WebGPU enabled in about:config)
- ❌ Safari (WebGPU support coming soon)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Run tests: `npm run test`
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Transformers.js](https://huggingface.co/docs/transformers.js) for making AI accessible in the browser
- [HuggingFace](https://huggingface.co/) for the SmolLM2 model
- [Vite](https://vitejs.dev/) for the amazing build tool
