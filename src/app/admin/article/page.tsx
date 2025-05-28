'use client'

import { TableArticle } from "@/components/table-article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
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
  
  return (
    <div className="bg-secondary h-screen">
      <div className="bg-white mx-8 my-8 border  rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-muted">
          <div className="text-base font-semibold">
            Total Article: {articles.data.length}
          </div>
        </div>
        <div className="flex items-center justify-between p-4 gap-4 border-b border-muted">
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="news">News</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              placeholder="Search articles" 
              type="text"
              name="search"
              className="w-[320px] bg-white text-black col-span-3" 
            />
          </div>
          <Link href="/admin/article/add">
            <Button className="bg-blue-600">
              <Plus className="h-4 w-4" />
              Add Article
            </Button>
          </Link>
        </div>
        <TableArticle articles={articles} />
      </div>
    </div>
  );
}
