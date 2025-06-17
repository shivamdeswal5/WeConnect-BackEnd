import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chats } from './chat.entity';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  uid: string;

  @OneToMany(() => Chatroom, (chatroom) => chatroom.chats)
  chats: Chats[];
}
