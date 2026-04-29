import { Skeleton } from "@/components/ui/skeleton";

export function NewsSkeleton() {
  return (
    <div className="flex items-center gap-4  justify-center">
      <div className="flex flex-col items-start">
        <Skeleton className="h-24 w-[250px] rounded-md" />
        <div className="my-3 flex flex-col gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <Skeleton className="h-24 w-[250px] rounded-md" />
        <div className="my-3 flex flex-col gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <Skeleton className="h-24 w-[250px] rounded-md" />
        <div className="my-3 flex flex-col gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
