import { Skeleton } from "@/components/ui/skeleton";

export default function MySkeletonCard() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4 px-4">
      <div className="w-full max-w-screen-lg space-y-4">
        <div className="flex space-x-3 justify-center items-center">
          <Skeleton className="h-[400px] w-[300px] rounded-xl" />
          <Skeleton className="h-[400px] w-[300px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
