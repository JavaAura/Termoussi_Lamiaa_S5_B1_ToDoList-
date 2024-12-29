export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'high' | 'medium' | 'low';
    status: 'completed' | 'inProgress' | 'notStarted';
    categoryName: string;
}
