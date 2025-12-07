// src/components/FilterBar.tsx
import React from 'react';
import type { TaskStatus } from 'types/task';

interface Props {
    filter: TaskStatus | 'all';
    onChange: (f: TaskStatus | 'all') => void;
}

/**
 * @description 过滤条件（全部/待办/已完成）
 * @param props 组件属性
 * @returns JSX.Element
 */
export const FilterBar: React.FC<Props> = ({ filter, onChange }) => {
    return (
        <div className="filter-bar" role="tablist" aria-label="过滤任务">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => onChange('all')}>全部</button>
            <button className={filter === 'todo' ? 'active' : ''} onClick={() => onChange('todo')}>待办</button>
            <button className={filter === 'done' ? 'active' : ''} onClick={() => onChange('done')}>已完成</button>
        </div>
    );
};
