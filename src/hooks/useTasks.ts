// src/hooks/useTasks.ts
import { useReducer, useEffect } from 'react';
import type { Task, TaskStatus } from 'types/task';

/** Action 类型定义（每一行注释说明） */
type Action =
    // 添加任务
    | { type: 'add'; payload: Task }
    // 切换完成状态
    | { type: 'toggle'; payload: { id: string } }
    // 删除任务
    | { type: 'remove'; payload: { id: string } }
    // 设置任务列表
    | { type: 'set'; payload: Task[] };

/** State 类型 */
type State = Task[];

/**
 * @description 负责任务的增删改逻辑
 * @param state 当前状态
 * @param action 分发的动作
 * @returns 新状态
 */
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'add':
            // 将新任务加入到数组头部
            return [action.payload, ...state];
        case 'toggle':
            // 切换任务状态（todo <-> done）
            return state.map((t) =>
                t.id === action.payload.id ? { ...t, status: t.status === 'todo' ? 'done' : 'todo' } : t
            );
        case 'remove':
            // 过滤掉指定 ID 的任务
            return state.filter((t) => t.id !== action.payload.id);
        case 'set':
            // 覆盖为给定列表
            return action.payload;
        default:
            // 保持类型完整性
            return state;
    }
}

/**
 * 自定义 Hook: 管理任务列表并持久化到 localStorage
 * @returns [tasks, dispatcher]
 */
export function useTasks() {
    // 使用 reducer 管理 state
    const [tasks, dispatch] = useReducer(reducer, []);

    // 首次挂载: 从 localStorage 加载任务
    useEffect(() => {
        try {
            const raw = localStorage.getItem('tasks_v1');
            if (raw) {
                const parsed = JSON.parse(raw) as Task[];
                dispatch({ type: 'set', payload: parsed });
            }
        } catch (e) {
            // 如果 localStorage 内容损坏, 忽略并保持空列表
            console.error('加载任务失败: ', e);
        }
    }, []);

    // 每当 tasks 改变时, 持久化到 localStorage
    useEffect(() => {
        try {
            localStorage.setItem('tasks_v1', JSON.stringify(tasks));
        } catch (e) {
            console.error('保存任务失败: ', e);
        }
    }, [tasks]);

    // 返回任务列表和分发函数
    return { tasks, dispatch };
}
