// src/types/task.ts

/** 任务状态 */
export type TaskStatus = 'todo' | 'done';

/** 任务对象类型 */
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
}
