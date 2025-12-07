// src/components/TaskForm.tsx
import React, { useState } from 'react';
import type { Task } from 'types/task';
import { validateTitle, validateDescription } from 'utils/validators';

/** Props for TaskForm component */
interface TaskFormProps {
    onAdd: (task: Task) => void;
}

/**
 * @description 用于输入新任务的表单组件
 *              - 标题和可选描述
 *              - 校验与错误提示
 * @param props 组件属性
 * @returns JSX.Element
 */
export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
    // 标题
    const [title, setTitle] = useState('');
    // 描述
    const [description, setDescription] = useState('');
    // 错误信息
    const [error, setError] = useState<string | null>(null);

    /**
     * @description 处理提交:构造任务对象并回调上层 onAdd
     * @param e 表单事件
     */
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // 校验标题
        const tErr = validateTitle(title);
        if (tErr) {
            setError(tErr);
            return;
        }
        // 校验描述
        const dErr = validateDescription(description);
        if (dErr) {
            setError(dErr);
            return;
        }
        // 构造任务对象
        const newTask: Task = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            title: title.trim(),
            description: description.trim() || undefined,
            status: 'todo',
            createdAt: new Date().toISOString()
        };
        try {
            onAdd(newTask);
            setTitle('');
            setDescription('');
            setError(null);
        } catch (err) {
            setError((err as Error)?.message || '添加任务时发生错误');
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit} aria-label="添加新任务表单">
            {/* 标题输入 */}
            <div className="field">
                <label htmlFor="task-title">标题</label>
                <input
                    id="task-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="输入任务标题"
                    aria-required
                />
            </div>

            {/* 描述输入 */}
            <div className="field">
                <label htmlFor="task-desc">描述（可选）</label>
                <textarea
                    id="task-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="输入任务描述"
                />
            </div>

            {/* 错误展示 */}
            {error && <div className="error" role="alert">{error}</div>}

            {/* 提交按钮 */}
            <div className="actions">
                <button type="submit" className="btn-primary">添加任务</button>
            </div>
        </form>
    );
};
