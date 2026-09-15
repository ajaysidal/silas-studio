# Silas Studio

AI-powered code generation and development studio built with Next.js 15, NextAuth.js v5, Prisma, and NVIDIA NIM.

## Features

- 🤖 **Multi-model AI Chat** - Access NVIDIA NIM models (Nemotron, DeepSeek, Kimi)
- 🔐 **Secure Authentication** - GitHub OAuth with NextAuth.js v5
- 📁 **Project Management** - Organize work with persistent context
- 🐙 **GitHub Integration** - Browse repos, create branches, open PRs
- 🎨 **Modern UI** - Tailwind CSS with dark mode support
- ⚡ **Streaming Responses** - Real-time AI responses via Server-Sent Events

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth**: NextAuth.js v5 (Auth.js)
- **Database**: SQLite + Prisma ORM
- **AI**: NVIDIA NIM API
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- GitHub OAuth App credentials
- NVIDIA NIM API key

### Installation

```bash
# Clone and install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Initialize database
pnpm exec prisma db push

# Start development server
pnpm dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite database path (default: `file:./dev.db`) |
| `AUTH_SECRET` | NextAuth secret (generate with `openssl rand -base64 32`) |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret |
| `NIM_API_KEY` | NVIDIA NIM API Key |

### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env`

### NVIDIA NIM Setup

1. Get API key from [NVIDIA NIM](https://www.nvidia.com/en-us/nvidia-nim/)
2. Add to `.env` as `NIM_API_KEY`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth route handlers
│   │   ├── chat/                  # Chat API with streaming
│   │   ├── github/                # GitHub API proxy
│   │   └── projects/              # Projects CRUD API
│   ├── chat/                      # Chat page
│   ├── projects/                  # Projects page
│   ├── settings/                  # Settings page
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── providers.tsx              # Session provider
│   ├── navigation.tsx             # Top navigation
│   ├── chat-interface.tsx         # Chat UI component
│   ├── projects-list.tsx          # Projects list UI
│   ├── github-repositories.tsx    # GitHub repos UI
│   └── settings-content.tsx       # Settings UI
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   └── nim-client.ts              # NVIDIA NIM client
└── auth/
    ├── auth.ts                    # NextAuth configuration
    └── route.ts                   # NextAuth route handler
```

## Available Models

- `deepseek-v4` - DeepSeek V4 (default)
- `nemotron-3.5` - NVIDIA Nemotron 3.5
- `kimi-k3` - Moonshot AI Kimi K3

## API Endpoints

### Chat
- `POST /api/chat` - Send messages (supports streaming)

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project

### GitHub
- `GET /api/github?endpoint=/user/repos` - List repositories
- `POST /api/github` - GitHub actions (createBranch, createPR, createFile, updateFile)

## Development

```bash
# Run dev server
pnpm dev

# Run type check
pnpm type-check

# Run linting
pnpm lint

# Generate Prisma client
pnpm exec prisma generate

# Push schema changes
pnpm exec prisma db push

# Open Prisma Studio
pnpm exec prisma studio
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm exec prisma generate
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## License

MIT
