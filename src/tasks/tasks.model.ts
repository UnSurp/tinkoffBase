import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface TaskCreateAttrs{
    task: any[];
    answer: any[];
    isFinished: boolean;
    isRight: boolean;
    userId: number;
    difficulty: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreateAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.ARRAY(DataType.STRING)})
    task: string;
    @Column({type: DataType.ARRAY(DataType.STRING)})
    answer: string;
    @Column({type: DataType.BOOLEAN})
    isFinished: boolean;
    @Column({type: DataType.BOOLEAN})
    isRight: boolean;
    @Column({type: DataType.INTEGER})
    difficulty: number;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(()=> User)
    user: User;
}