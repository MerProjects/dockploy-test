'use client';

import { useState } from 'react';
import { createTask, updateTask } from '@/app/actions';
import toast from 'react-hot-toast';

type TaskFormProps = {
    task?: { id: string; title: string; description: string | null; status: string };
    onCancel?: () => void;
    onSuccess?: () => void;
};

export default function TaskForm({ task, onCancel, onSuccess }: TaskFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            if (task) {
                await updateTask(task.id, formData);
                toast.success('Task updated successfully');
            } else {
                await createTask(formData);
                toast.success('Task created successfully');
                (e.target as HTMLFormElement).reset();
            }
            onSuccess?.();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-800">{task ? 'Edit Task' : 'Create New Task'}</h3>

            <div>
                <label htmlFor={`title-${task?.id || 'new'}`} className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    id={`title-${task?.id || 'new'}`}
                    name="title"
                    required
                    defaultValue={task?.title}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    placeholder="What needs to be done?"
                />
            </div>

            <div>
                <label htmlFor={`description-${task?.id || 'new'}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    id={`description-${task?.id || 'new'}`}
                    name="description"
                    rows={3}
                    defaultValue={task?.description || ''}
                    placeholder="Optional details..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
            </div>

            {task && (
                <div>
                    <label htmlFor={`status-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id={`status-${task.id}`}
                        name="status"
                        defaultValue={task.status}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                </div>
            )}

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors disabled:opacity-70"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
