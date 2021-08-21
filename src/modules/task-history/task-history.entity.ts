import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ETaskStatus } from '../../types/task';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity()
export class TaskHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.history)
  task: Task;

  @Column({ type: 'enum', enum: ETaskStatus, default: ETaskStatus.todo })
  oldStatus: ETaskStatus;

  @Column({ type: 'enum', enum: ETaskStatus, default: ETaskStatus.todo })
  newStatus: ETaskStatus;

  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
