import { ArchiveApiOptions } from './../../../node_modules/cloudinary/types/index.d';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pet } from './schemas/pet.schema';
import { CreatePetDto } from './dtos/create-pet.dto';
import { UpdatePetDto } from './dtos/update-pet.dto';
import { UserService } from '../user/user.service';
import { ERROR_MESSAGES } from 'src/shared/constants/messages';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Pet') private petModel: Model<Pet>,
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findById(_id: string) {
    return this.petModel.findOne({ _id: new Types.ObjectId(_id) });
  }

  async getPetsByUserId(userId: string) {
    await this.userService.validateUserExists(userId);
    return this.petModel.find({ userId: new Types.ObjectId(userId) });
  }

  async addPet(userId: string, createPetDto: CreatePetDto, avatar: Express.Multer.File) {
    await this.userService.validateUserExists(userId);
    const uploadedAvatar = avatar ? await this.cloudinaryService.uploadFile(avatar) : null;
    const avatarUrl = uploadedAvatar ? uploadedAvatar.url : null;
    const newPet = new this.petModel({
      ...createPetDto,
      avatar: avatarUrl,
      userId: new Types.ObjectId(userId),
    });
    return newPet.save();
  }

  async updatePet(userId: string, updatePetDto: UpdatePetDto, avatar: Express.Multer.File) {
    await this.userService.validateUserExists(userId);
    const uploadedAvatar = avatar ? await this.cloudinaryService.uploadFile(avatar) : null;
    const avatarUrl = uploadedAvatar ? uploadedAvatar.url : null;
    const petId = updatePetDto._id.toString();
    await this.validateUserAndPet(userId, petId);
    const updatedPet = await this.petModel.findByIdAndUpdate(
      new Types.ObjectId(petId),
      { 
      $set: { 
        ...updatePetDto, 
        avatar: avatarUrl 
      } 
      },
      { new: true },
    );
    return updatedPet;
  }

  async deletePet(userId: string, petId: string) {
    await this.userService.validateUserExists(userId);
    await this.validateUserAndPet(userId, petId);
    return this.petModel.deleteOne({ _id: new Types.ObjectId(petId) });
  }

  async validatePetExists(petId: string) {
    const pet = await this.findById(petId);
    if (!pet) {
      throw new NotFoundException(ERROR_MESSAGES.PET_NOT_FOUND);
    }
    return pet;
  }

  async validateUserAndPet(userId: string, petId: string) {
    const pet = await this.findById(petId);
    if (!pet) {
      throw new NotFoundException(ERROR_MESSAGES.PET_NOT_FOUND);
    }
    if (pet.userId.toString() !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.NO_PERMISSION_PET);
    }
  }
}
