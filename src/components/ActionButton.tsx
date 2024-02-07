import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components//EditButton";
import ViewButton from "./ViewButton";

interface ActionButtonProps<T> {
    id: T;
    handleDelete: (id: T) => void;
    handleEdit: (id: T) => void;
    handleView: (id: T) => void;
}

export default function ActionButton<T>({
    id,
    handleDelete,
    handleEdit,
    handleView,
}: ActionButtonProps<T>) {
    return (
        <div className="flex gap-2">
            <ViewButton 
                id={id}
                handleView={handleView} 
            />
            <EditButton
                id={id}
                handleEdit={handleEdit}
            />
            <DeleteButton
                id={id} 
                handleDelete={handleDelete}
            />
        </div>
    )
}