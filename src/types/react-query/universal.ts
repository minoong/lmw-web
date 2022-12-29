import { UseQueryOptions } from '@tanstack/react-query'

export type UniversalUseQueryOptions<T extends (...args: any) => any, T2 = T> = UseQueryOptions<
 Awaited<ReturnType<T>>,
 unknown,
 T2 extends (...args: any) => any ? Awaited<ReturnType<T2>> : T2,
 any[]
>
