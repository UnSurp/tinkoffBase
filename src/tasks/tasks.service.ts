import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Task} from "./tasks.model";

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private taskRepository: typeof Task) {
    }
    async generateTasks(difficulty: number, userId : number): Promise<{ tasks: string[], answers: string[] }> {
        const tasks = [];
        const answers = [];

        for (let i = 0; i < 10; i++) {
            const task = this.generateTask(difficulty);
            tasks.push(task.question);
            answers.push(task.answer);
        }
        await this.taskRepository.create({userId: userId, task: tasks, answer: answers, difficulty: difficulty})
        return {tasks, answers}
    }

    private generateTask(difficulty: number): { question: string, answer: string } {
        switch (difficulty) {
            case 1:
                return this.generateEasyTask();
            case 2:
                return this.generateMediumTask();
            case 3:
                return this.generateHardTask();
            default:
                throw new Error('Invalid difficulty level');
        }
    }

    private generateEasyTask(): { question: string, answer: string } {
        const numOperands = this.getRandomInt(2, 5);
        const operands = this.getOperands(numOperands, 1, 10);
        const question = operands.join(' + ');
        const answer = operands.reduce((acc, curr) => acc + curr, 0);
        return { question, answer: answer.toString() };
    }

    private generateMediumTask(): { question: string, answer: string } {
        const a = this.getRandomInt(1, 10);
        const b = this.getRandomInt(1, 10);
        const operation = Math.random() > 0.5 ? '*' : '/';
        const question = `${a} ${operation} ${b}`;
        const answer = operation === '*' ? a * b : (a / b).toFixed(2);
        return { question, answer: answer.toString() };
    }

    private generateHardTask(): { question: string, answer: string } {
        const a = this.getRandomInt(1, 10);
        const b = this.getRandomInt(1, 10);
        const operation = Math.random() > 0.5 ? '>' : '<';
        const question = `${a} ${operation} ${b}`;
        const answer = operation === '>' ? a > b : a < b;
        return { question, answer: answer.toString() };
    }

    private getOperands(num: number, min: number, max: number): number[] {
        const operands = [];
        for (let i = 0; i < num; i++) {
            operands.push(this.getRandomInt(min, max));
        }
        return operands;
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}