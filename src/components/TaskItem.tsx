// src/components/TaskItem.tsx
import React from 'react';
import type { Task } from 'types/task';

/**
 * Props for TaskItem
 */
interface Props {
    task: Task;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

/**
 * @description 单个任务项组件
 * @param props 组件属性
 * @returns JSX.Element
 */
export const TaskItem: React.FC<Props> = ({ task, onToggle, onRemove }) => {
    return (
        <li className={`task-item ${task.status === 'done' ? 'done' : ''}`} aria-label={`任务 ${task.title}`}>
            {/* 左侧状态切换按钮 */}
            <button className="toggle" onClick={() => onToggle(task.id)} aria-pressed={task.status === 'done'}>
                {task.status === 'done' ? '✔' : '○'}
            </button>

            {/* 任务主要信息 */}
            <div className="content">
                <div className="title">{task.title}</div>
                {task.description && <div className="desc">{task.description}</div>}
                <div className="meta">创建于: {new Date(task.createdAt).toLocaleString()}</div>
            </div>

            {/* 右侧删除按钮 */}
            <button className="remove" onClick={() => onRemove(task.id)} aria-label={`删除 ${task.title}`}>
                🗑
            </button>
        </li>
    );
};
