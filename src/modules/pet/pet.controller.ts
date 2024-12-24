import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePetDto } from './dtos/create-pet.dto';
import { UpdatePetDto } from './dtos/update-pet.dto';
import { USER_MESSAGES } from 'src/shared/constants/messages';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pets')
@ApiBearerAuth()
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  async getPets(@Request() req) {
    return this.petService.getPetsByUserId(req.user.userId as string);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new pet' })
  async addPet(@Request() req, @Body() createPetDto: CreatePetDto) {
    const result = await this.petService.addPet(req.user.userId, createPetDto);
    return {
      message: USER_MESSAGES.ADD_NEW_PET_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update a pet' })
  async updatePet(
    @Request() req,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const result = await this.petService.updatePet(
      req.user.userId,
      updatePetDto,
    );
    return {
      message: USER_MESSAGES.UPDATE_PET_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'petId',
    type: 'string',
    required: true,
    description: 'Pet ID',
    example: '66fe1855ed43466415cef4d3',
  })
  @ApiOperation({ summary: 'Delete a pet' })
  @Delete(':petId')
  async deletePet(@Request() req, @Param('petId') petId: string) {
    const userId = req.user.userId as string;
    await this.petService.deletePet(userId, petId);
    return {
      message: USER_MESSAGES.DELETE_PET_SUCCESSFULLY,
    };
  }
}
