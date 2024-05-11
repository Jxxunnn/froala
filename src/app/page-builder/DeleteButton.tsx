export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      onClick={onDelete}
      className="delete-btn cursor-pointer absolute z-50 right-[5px] text-sm top-1/2 -translate-y-1/2"
    >
      ❌
    </button>
  );
}
