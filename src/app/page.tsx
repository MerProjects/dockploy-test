import { getTasks } from './actions';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';

// Ensures the page is dynamically rendered since data can change frequently
export const dynamic = 'force-dynamic';

export default async function Home() {
  const tasks = await getTasks();

  const todoTasks = tasks.filter(t => t.status === 'TODO');
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(t => t.status === 'DONE');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Task Management</h1>
        <p className="text-gray-500 text-base mt-2">Manage your tasks efficiently and elegantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <TaskForm />
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Active Tasks list */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Active Tasks <span className="text-sm font-normal text-gray-500 ml-2">({todoTasks.length + inProgressTasks.length})</span>
            </h2>

            {todoTasks.length === 0 && inProgressTasks.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                You have no active tasks at the moment.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {[...inProgressTasks, ...todoTasks].map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>

          {/* Completed Tasks list */}
          {doneTasks.length > 0 && (
            <div className="opacity-75 hover:opacity-100 transition-opacity">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                Completed <span className="text-sm font-normal text-gray-500 ml-2">({doneTasks.length})</span>
              </h2>
              <div className="flex flex-col gap-3">
                {doneTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
