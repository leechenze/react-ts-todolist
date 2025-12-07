// src/utils/validators.ts

/**
 * @description 校验任务标题: 非空, 长度限制
 * @param title 任务标题
 * @returns 返回错误信息字符串, 若为空表示校验通过
 */
export function validateTitle(title: string): string | null {
    // 移除首尾空白
    const t = title.trim();
    // 标题不可空
    if (t.length === 0) return '标题不能为空';
    // 标题长度限制为 1-100
    if (t.length > 100) return '标题不能超过 100 个字符';
    // 合格返回 null
    return null;
}

/**
 * @description 校验描述: 可选, 但不能太长
 * @param desc 描述
 * @returns 错误信息或 null
 */
export function validateDescription(desc?: string): string | null {
    // 若未提供则通过
    if (!desc) return null;
    // 长度上限 500
    if (desc.length > 500) return '描述不能超过 500 个字符';
    return null;
}
