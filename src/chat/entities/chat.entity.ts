import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Chatroom } from './chat-room.entity';

@Entity()
export class Chats{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  uid: string;

  @Column({ unique: true })
  senderId: string;

  @Column({ unique: true })
  text: string;

  @Column({ unique: true })
  timestamp: string;

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.chats)
   @JoinColumn({ name: 'userId' })
   chatRoom: Chatroom;


  
}
