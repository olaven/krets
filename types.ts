
export interface Response extends Record<string, any> {
    indicator: 'smile' | 'neutral' | 'bad', 
    comment: string
}

export interface Brand extends Record<string, any> {
    name: string  
}