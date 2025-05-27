import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Content } from "@/components/content";
import { Navbar } from "@/components/navbar";

const articles = {
  data: [
    {
      id: 1,
      title: "Understanding React Hooks",
      description: "A deep dive into React Hooks and how they can simplify your code.",
      image: "/images/hero.jpg",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      description: "Comparing CSS Grid and Flexbox for layout design.",
      image: "/images/hero.jpg",
      date: "2023-10-02",
    },
    {
      id: 3,
      title: "JavaScript ES2023 Features",
      description: "Exploring the new features introduced in JavaScript ES2023.",
      image: "/images/hero.jpg",
      date: "2023-10-03",
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      description: "Best practices for creating accessible web applications.",
      image: "/images/hero.jpg",
      date: "2023-10-04",
    },
    {
      id: 5,
      title: "State Management in React",
      description: "An overview of state management solutions in React.",
      image: "/images/hero.jpg",
      date: "2023-10-05",
    },
    {
      id: 6,
      title: "Next.js for Server-Side Rendering",
      description: "How to use Next.js for server-side rendering in React applications.",
      image: "/images/hero.jpg",
      date: "2023-10-06",
    },
    {
      id: 7,
      title: "Responsive Design Principles",
      description: "Key principles for creating responsive web designs.",
      image: "/images/hero.jpg",
      date: "2023-10-07",
    },
    {
      id: 8,
      title: "Introduction to TypeScript",
      description: "Getting started with TypeScript and its benefits for JavaScript developers.",
      image: "/images/hero.jpg",
      date: "2023-10-08",
    },
    {
      id: 9,
      title: "Web Performance Optimization",
      description: "Techniques for optimizing web performance and improving load times.",
      image: "/images/hero.jpg",
      date: "2023-10-09",
    },
  ]
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Content articles={articles} />
      <Footer />
    </>
  );
}
