import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.config';
import { config } from '../../config/app.config';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

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

  public static hashPassword = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(config.salt));
  };

  public generateAuthToken = () => {
    return jwt.sign(
      { id: this.id, name: this['name'], email: this['email'] },
      jwtConfig.secret,
      jwtConfig.signOptions,
    );
  };

  public validatePassword = (password: string): Boolean => {
    return bcrypt.compareSync(password, this['password']);
  };
}
