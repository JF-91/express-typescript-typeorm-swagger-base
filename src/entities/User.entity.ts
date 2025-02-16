import { Entity, Column, OneToMany } from 'typeorm';
import { Post } from './Post.entity';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @OneToMany(() => Post, post => post.author)
    posts!: Post[];
}
