# Next.js & Sanity.io Blog Project

This project is a blog built using [Sanity.io](https://www.sanity.io/), [Next.js](https://nextjs.org/), and [TypeScript](https://www.typescriptlang.org/). It demonstrates how to create a dynamic and scalable blog platform with a focus on modern web development practices.

## Running the Project Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Lokacitron123/nextjs-sanity-cms-blog-practise.git
    cd nextjs-sanity-cms-blog-practise
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Sanity.io:**

   - Go to Sanity.io and create a new project.
   - Generate an API token with appropriate permissions.
   - Create a .env.local file in the root directory of your project and add your Sanity project details:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="your-dataset"
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser and navigate to:**

   ```arduino
   http://localhost:3000
   ```

6. **to reach Sanity studio CMS, navigate to:**

   ```arduino
   http://localhost:3000/studio
   ```

## Techniques Used

- Next.js: A React framework for server-rendered or statically-exported React applications.
- Sanity.io: A headless CMS for managing content.
- TypeScript: A statically typed superset of JavaScript that adds types to the language.
- Styled-components: A library for styling React components using tagged - template literals.
- Groq: A query language for Sanity to fetch data.
- SSR/SSG: Server-Side Rendering and Static Site Generation for optimal performance and SEO.

## What I've Learned

- How to integrate Sanity.io with a Next.js project.
- The benefits of using TypeScript for type safety and developer experience.
- Implementing Server-Side Rendering (SSR) and Static Site Generation (SSG) with Next.js.
- Fetching and managing data using Groq queries.
- Styling components using TailwindCSS.
- Best practices for structuring a modern web application.
- Optimizing performance and SEO with Next.js features.
- Managing environment variables and sensitive data.
