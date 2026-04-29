import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="flex items-center gap-4 justify-center">
      <div className="flex flex-col gap-4 px-4">
        <Skeleton className="h-4 w-full" />
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-50" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-50" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
