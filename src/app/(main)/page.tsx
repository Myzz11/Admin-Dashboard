import { Skeleton } from "@/components/ui/skeleton";

const MainItems = Array(10).fill(0);

const MainPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {MainItems.map((item, index) => (
        <Skeleton className="w-full h-30" key={index} />
      ))}
    </div>
  );
};

export default MainPage;
