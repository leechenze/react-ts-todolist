// src/App.tsx
import React, { useState, useCallback } from 'react';
import { useTasks } from 'hooks/useTasks';
import { TaskForm } from 'components/TaskForm';
import { TaskList } from 'components/TaskList';
import { FilterBar } from 'components/FilterBar';
import type { Task, TaskStatus } from 'types/task';
import './styles/App.scss';

/**
 * App: 应用根组件
 * - 管理过滤器状态
 * - 传递 tasks 与 dispatcher 到子组件
 * @returns JSX.Element
 */
export const App: React.FC = () => {
    // 使用自定义 hook 获取 tasks 和 dispatch
    const { tasks, dispatch } = useTasks();
    // 本地状态: 当前过滤
    const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

    /**
     * 添加任务回调
     * @param task 新任务
     */
    const handleAdd = useCallback((task: Task) => {
        // 以 try/catch 捕获上层可能抛出的错误
        try {
            dispatch({ type: 'add', payload: task });
        } catch (e) {
            console.error('添加任务失败: ', e);
            throw e;
        }
    }, [dispatch]);

    /**
     * 切换任务状态
     * @param id 任务 id
     */
    const handleToggle = useCallback((id: string) => {
        dispatch({ type: 'toggle', payload: { id } });
    }, [dispatch]);

    /**
     * 删除任务
     * @param id 任务 id
     */
    const handleRemove = useCallback((id: string) => {
        // 在删除前可以添加确认
        if (!confirm('确认删除该任务？')) return;
        dispatch({ type: 'remove', payload: { id } });
    }, [dispatch]);

    // 渲染主界面
    return (
        <div className="app">
            <header className="app-header">
                <h1>个人任务管理</h1>
                <p className="subtitle">响应式任务列表</p>
            </header>

            <main className="app-main">
                <section className="left">
                    <TaskForm onAdd={handleAdd} />
                    <FilterBar filter={filter} onChange={setFilter} />
                </section>

                <section className="right">
                    <TaskList tasks={tasks} filter={filter} onToggle={handleToggle} onRemove={handleRemove} />
                </section>
            </main>

            <footer className="app-footer">
                <small>任务数量: {tasks.length} — 最佳实践示例, 含验证与持久化</small>
            </footer>
        </div>
    );
};
