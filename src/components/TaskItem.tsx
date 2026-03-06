'use client';

import { useState } from 'react';
import { deleteTask, updateTaskStatus } from '@/app/actions';
import toast from 'react-hot-toast';
import TaskForm from './TaskForm';

type Task = {
    id: string;
    title: string;
    description: string | null;
    status: string;
    createdAt: Date;
};

export default function TaskItem({ task }: { task: Task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        setIsDeleting(true);
        try {
            await deleteTask(task.id);
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error('Failed to delete task');
            setIsDeleting(false);
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        try {
            await updateTaskStatus(task.id, newStatus);
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (isEditing) {
        return (
            <div className="mb-4">
                <TaskForm
                    task={task}
                    onCancel={() => setIsEditing(false)}
                    onSuccess={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-blue-300 transition-colors">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                    <h4 className={`text-base font-semibold truncate ${task.status === 'DONE' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.title}</h4>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${task.status === 'DONE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            task.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                        {task.status.replace('_', ' ')}
                    </span>
                </div>
                {task.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                )}
                <div className="mt-2 text-xs text-gray-400">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0 justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                    {task.status !== 'DONE' && (
                        <button
                            onClick={() => handleStatusChange('DONE')}
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-md transition-colors"
                        >
                            Mark Done
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 px-2 py-1.5 hover:bg-blue-50 rounded-md transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-sm font-medium text-red-600 hover:text-red-800 px-2 py-1.5 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
