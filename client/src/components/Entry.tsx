export default function Entry({
  content,
  onDelete,
}: {
  content: string;
  onDelete: () => Promise<void>;
}) {
  return (
    <div className="border-2 border-black flex flex-col justify-between items-center w-60 text-center rounded-md break-words h-40 overflow-hidden bg-white hover:shadow-lg">
      <p className="p-2 ">{content}</p>
      <button
        type="button"
        onClick={onDelete}
        className="bg-red-400 hover:bg-red-300 w-full p-2 border-t-2 border-black"
      >
        Delete
      </button>
    </div>
  );
}
