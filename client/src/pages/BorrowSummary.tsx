import { useGetBorrowSummaryQuery } from "@/features/borrow/borrowApi";
import { Loader2 } from "lucide-react";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();
  // console.log("Borrow Summary Data:", data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
        <span className="ml-2 text-purple-600">Loading summary...</span>
      </div>
    );
  }

  if (isError || !data?.length) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load borrow summary or no data available.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-400">
        📄 Borrow Summary
      </h2>

      <div className="overflow-x-auto rounded-none shadow-md border dark:border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs uppercase bg-purple-100 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Book Title</th>
              <th className="px-6 py-3">ISBN</th>
              <th className="px-6 py-3">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((summary, index) => (
              <tr
                key={summary._id}
                className="cursor-pointer w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none dark:hover:bg-gray-700 hover:bg-purple-50"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{summary?.book?.title || "N/A"}</td>
                <td className="px-6 py-4">{summary?.book?.isbn || "N/A"}</td>
                <td className="px-6 py-4">{summary.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
