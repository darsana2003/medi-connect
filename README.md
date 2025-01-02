# MediConnect

MediConnect is a modern healthcare platform built with Next.js that connects medical professionals and administrators through a seamless web interface.

## Features

- Role-based authentication system
- Separate interfaces for doctors and administrators
- Modern and responsive design
- Secure user management
- Interactive dashboard for both roles

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Next Auth (for authentication)

## Project Structure

```
medi-connect/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Role selection landing page
│   │   ├── layout.tsx              # Root layout
│   │   ├── doctors/               # Doctor routes
│   │   └── admin/                # Admin routes
│   ├── components/               # Reusable components
│   └── styles/                  # Global styles
├── public/                     # Static assets
└── package.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement responsive design
- Follow Next.js 13+ conventions
- Maintain proper component structure

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
hi