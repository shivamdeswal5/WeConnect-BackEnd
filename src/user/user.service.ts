import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { uid: createUserDto.uid },
    });
    if (existing) return existing;

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


async createUser(userDto: CreateUserDto): Promise<User> {
  const existingUser = await this.userRepository.findOne({
    where: { email: userDto.email },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = this.userRepository.create(userDto);
  return this.userRepository.save(newUser);
}


  async handleUpload(file: Express.Multer.File) { 
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }
    const allowedImageMimeTypes = ['image/jpeg', 'image/png', 'image/avif'];
    if (!allowedImageMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException(
        'File is to large, Please Compress and try again ...!',
      );
    }
    const result = this.cloudinaryService.uploadImage(file);
    const url = (await result).secure_url;
    return url;
  }
}
