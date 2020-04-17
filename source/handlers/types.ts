
export interface Response extends Record<string, any> {
    indicator: 'smile' | 'neutral' | 'sad', 
    comment: string
}

export interface Brand extends Record<string, any> {
    name: string  
}