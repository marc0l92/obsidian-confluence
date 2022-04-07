export interface IJiraIssue {
    id: string
    key: string
    fields: {
        assignee: IJiraUser
        created: string
        creator: IJiraUser
        description: string
        duedate: string
        issuetype: {
            iconUrl: string
            name: string
        }
        priority: {
            iconUrl: string
            name: string
        }
        reporter: IJiraUser
        status: {
            statusCategory: {
                colorName: string
            }
            name: string
            description: string
        }
        summary: string
        updated: string
    }
}

interface IJiraUser {
    active: boolean
    displayName: string
    self: string
}

export interface IJiraSearchResults {
    issues: IJiraIssue[]
    maxResults: number
    startAt: number
    total: number
}

export function createProxy<T extends object>(obj: T): T {
    const proxy = new Proxy<T>(obj, {
        get: (target: T, p: string, receiver: any) => {
            if (p in target) {
                const value = Reflect.get(target, p, receiver)
                if (value) {
                    if (value instanceof Object) {
                        return createProxy(value)
                    } else {
                        return value
                    }
                }
            }
            return ''
        },
    })
    return proxy
}