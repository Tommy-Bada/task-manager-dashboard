import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

interface SortableTaskCardProps {
  id: string;
  priority: string;
  title: string;
  visual?: string;
  description?: string;
  status: string;
  date: string;
  time: string;
  onEdit?: (task: SortableTaskCardProps) => void;
}

export default function SortableTaskCard(props: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const { onEdit, ...taskProps } = props;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <TaskCard {...taskProps} onEdit={onEdit} />
    </div>
  );
}
