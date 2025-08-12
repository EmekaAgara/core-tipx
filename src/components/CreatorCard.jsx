import Link from "next/link";

export default function CreatorCard({ creator }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold">{creator.name}</h2>
      <p className="text-gray-600">{creator.category}</p>
      <p className="my-2">
        <span className="font-semibold">Total Tips:</span> {creator.totalTips}{" "}
        CORE
      </p>
      <Link
        href={`/tip/${creator.address}`}
        className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tip This Creator
      </Link>
    </div>
  );
}
