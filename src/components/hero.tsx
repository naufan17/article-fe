import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface CategoryProps {
  data: {
    id: string;
    name: string;
  }[];
  category: string | undefined;
  setCategory: (category: string | undefined) => void;
  title: string | undefined;
  setTitle: (title: string | undefined) => void;
  setPage: (page: number) => void;
}

export function Hero({ data, category, setCategory, title, setTitle, setPage }: CategoryProps) {
  return (
    <>
      <nav className="absolute top-0 z-50 w-full bg-transparent">
        <div className="hidden sm:flex  flex-wrap justify-between items-center mx-auto py-2 px-4 md:py-4 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
          <Link href="/" className="p-2">
            <Image 
            src="/logo-white.svg" 
            alt="Logo" 
            width={150} 
            height={30} 
            />
          </Link>
          <div>
            <NavUser />
          </div>
        </div>
      </nav>
      <div
        className="relative flex items-center justify-center h-[500px] bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-blue-600 opacity-80" />
        <div className="relative py-8 px-4 md:py-12 md:px-8 mx-auto sm:w-screen sm:max-w-4xl text-white text-center">
          <span className="text-sm sm:text-base font-bold mb-2 block">
            Blog genzet
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium mb-4">
            The Journal: Design Resources, Interviews, and Industry News
          </h1>
          <h5 className="text-xl sm:text-2xl font-normal mb-8">
            Your daily doose of design insights!
          </h5>
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl justify-center items-center mx-auto bg-blue-500 bg-opacity-90 rounded-xl p-2 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-slate-800 w-full sm:w-auto"
                >
                  Select a category
                  <ChevronDown className="ml-2 h-4 w-4" />                  
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Categories
                </DropdownMenuLabel>
                {data.map((cat) => (
                <DropdownMenuCheckboxItem
                  key={cat.id}
                  checked={category === cat.id}
                  onCheckedChange={(checked) => {
                    setCategory(checked ? cat.id : undefined)
                    setPage(1)
                  }}
                >
                  {cat.name}
                </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input 
              placeholder="Search articles" 
              type="text"
              name="search"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white text-black col-span-3" 
            />
          </div>
        </div>
      </div>
    </>
  );
}