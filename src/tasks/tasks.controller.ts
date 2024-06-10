import {Controller, Get, Param} from "@nestjs/common";
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    generateTasks(@Param('difficulty') difficulty: number, @Param('userId') userId: number){
        return this.tasksService.generateTasks(difficulty, userId);
    }

}