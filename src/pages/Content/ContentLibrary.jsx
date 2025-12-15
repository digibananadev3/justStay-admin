import SearchComponent from "../../components/BasicComponent/SearchComponent";
import SelectComponent from "../../components/BasicComponent/SelectComponent";
import { LuPlus, LuImage, LuFileText, LuVideo } from "react-icons/lu";
import ContentCard from "./ContentCard";

const sampleData = [
  {
    icon: <LuFileText className="text-[#2B7FFF]" />,
    title: "Terms of Service",
    statusLabel: "Published",
    statusTone: "green",
    description: "Platform terms and conditions",
    meta: { category: "Legal", modified: "2024-03-15", by: "Admin Team" },
  },
  {
    icon: <LuImage className="text-[#00C950]" />,
    title: "Homepage Hero Image",
    statusLabel: "Published",
    statusTone: "green",
    thumbnail: "https://images.unsplash.com/photo-1501117716987-c8e2aeb6f6d1?q=80&w=1200&auto=format&fit=crop",
    description: "Main banner image for homepage",
    meta: { category: "Homepage", modified: "2024-03-14", by: "Content Team" },
  },
  {
    icon: <LuVideo className="text-[#AD46FF]" />,
    title: "How to Book Tutorial",
    statusLabel: "Draft",
    statusTone: "yellow",
    description: "Step-by-step booking guide",
    meta: { category: "Help", modified: "2024-03-13", by: "Content Team" },
  },
];

const ContentLibrary = () => {
  return (
    <>
      <div className="border rounded-2xl border-[#E5E7EB] p-4 mt-8">
        <div className="flex items-center justify-between ">
          <h2 className="text-xl font-semibold text-[#101828]">Platform Content Library</h2>
          <button className="inline-flex items-center gap-2 bg-[#009689] text-white text-[14px] font-medium px-4 py-2 rounded-lg">
            <LuPlus className="mr-4" />
            Add Content
          </button>
        </div>

        <div className="flex items-center gap-4 my-12">
          <div className="w-full">
            <SearchComponent placeholder="Search content by title or description..." />
          </div>
          <div className="w-[152px]">
            <SelectComponent options={["All Categories", "Legal", "Homepage", "Help"]} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sampleData.map((item, idx) => (
            <ContentCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ContentLibrary