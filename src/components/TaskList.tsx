// src/components/TaskList.tsx
import React from 'react';
import type { Task, TaskStatus } from 'types/task';
import { TaskItem } from './TaskItem';

/**
 * Props for TaskList
 */
interface Props {
    tasks: Task[];
    filter: TaskStatus | 'all';
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

/**
 * @description 展示任务列表并根据 filter 过滤
 * @param props 组件属性
 * @returns JSX.Element
 */
export const TaskList: React.FC<Props> = ({ tasks, filter, onToggle, onRemove }) => {
    // 根据 filter 过滤 tasks
    const filtered = tasks.filter((t) => (filter === 'all' ? true : t.status === filter));

    // 渲染空状态或列表
    if (filtered.length === 0) {
        return <div className="empty">没有任务（当前过滤: {filter}）</div>;
    }

    return (
        <ul className="task-list" aria-live="polite">
            {filtered.map((t) => (
                <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
            ))}
        </ul>
    );
};
