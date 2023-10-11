/**
 * 成功返回
 * @param data
 * @param param1
 * @returns
 */
export function resultSuccess<T = any>(data: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    data,
    message,
    type: 'success',
  }
}

/**
 * 成功带分页返回
 * @param page
 * @param pageSize
 * @param list
 * @param param3
 * @returns
 */
export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: object[],
  { message = 'ok' } = {}
) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      current: page,
      size: pageSize,
      records: pageData,
      total: list.length,
    }),
    message,
  }
}

/**
 * 失败返回
 * @param message
 * @param param1
 * @returns
 */
export function resultError(
  message = 'Request failed',
  { code = -1, data = null } = {}
) {
  return {
    code,
    data,
    message,
    type: 'error',
  }
}

/**
 * 分页
 * @param pageNo
 * @param pageSize
 * @param array
 * @returns
 */
export function pagination<T = any>(
  pageNo: number,
  pageSize: number,
  array: T[]
): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}
