import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";
import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Task} from "./tasks.model";

@Module({
    controllers: [TasksController],
    providers: [TasksService],
    imports: [
        SequelizeModule.forFeature([Task])
    ],
    exports:[
        TasksService
    ]
})
export class TasksModule {

}
