function equalThenAfter<T = any>(x: T, y: T): T | undefined {
    return x === y ? undefined : y
}

export {equalThenAfter}