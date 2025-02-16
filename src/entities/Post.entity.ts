import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Post extends BaseEntity {
    @Column()
    title!: string;

    @Column()
    content!: string;

    @ManyToOne(() => User, user => user.posts)
    author!: User;
}
