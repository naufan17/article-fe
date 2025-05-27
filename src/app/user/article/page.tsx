'use client'

import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Content } from "@/components/content";
import { Navbar } from "@/components/navbar";
// import { useArticle } from "@/hooks/api/use-article";

const articles = {
  data: [
    {
      id: 1,
      title: "Understanding React Hooks",
      content: "A deep dive into React Hooks and how they can simplify your code.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-01",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      content: "Comparing CSS Grid and Flexbox for layout design.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-02",
    },
    {
      id: 3,
      title: "JavaScript ES2023 Features",
      content: "Exploring the new features introduced in JavaScript ES2023.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-03",
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      content: "Best practices for creating accessible web applications.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-04",
    },
    {
      id: 5,
      title: "State Management in React",
      content: "An overview of state management solutions in React.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-05",
    },
    {
      id: 6,
      title: "Next.js for Server-Side Rendering",
      content: "How to use Next.js for server-side rendering in React applications.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-06",
    },
    {
      id: 7,
      title: "Responsive Design Principles",
      content: "Key principles for creating responsive web designs.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-07",
    },
    {
      id: 8,
      title: "Introduction to TypeScript",
      content: "Getting started with TypeScript and its benefits for JavaScript developers.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-08",
    },
    {
      id: 9,
      title: "Web Performance Optimization",
      content: "Techniques for optimizing web performance and improving load times.",
      imageUrl: "/images/hero.jpg",
      createdAt: "2023-10-09",
    },
  ]
}

export default function UserArticlePage() {
  // const { data: articles } = useArticle();
  // console.log(articles);
  
  return (
    <>
      <Navbar />
      <Hero />
      <Content data={articles.data} />
      <Footer />
    </>
  );
}
