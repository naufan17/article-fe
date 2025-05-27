import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <div
      className="relative flex items-center justify-center h-[500px] bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/hero.jpg)' }}
    >
      <div className="absolute inset-0 bg-blue-600 opacity-80" />
      <div className="relative py-8 px-4 md:py-12 md:px-8 mx-auto sm:w-screen sm:max-w-3xl text-white text-center">
        <span className="text-sm sm:text-base font-bold mb-2 block">
          Blog genzet
        </span>
        <h1 className="text-4xl sm:text-5xl font-medium mb-4">
          The Journal: Design Resources, Interviews, and Industry News
        </h1>
        <h5 className="text-xl sm:text-2xl font-normal mb-8">
          Your daily doose of design insights!
        </h5>
        <div className="bg-blue-500 bg-opacity-90 rounded-xl p-2">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <Select>
              <SelectTrigger className="w-full bg-white text-black">
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
              className="w-full bg-white text-black col-span-3" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}