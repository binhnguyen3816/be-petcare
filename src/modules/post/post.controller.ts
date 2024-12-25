import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreateCommentDto } from '../comment/dtos/create-comment.dto';
import { CommentService } from '../comment/comment.service';
import { CreateLikeDto } from '../like/dtos/create-like.dto';
import { LikeService } from '../like/like.service';
import { USER_MESSAGES } from 'src/shared/constants/messages';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@ApiBearerAuth()
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
    private readonly likeService: LikeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Type of post (optional)',
    example: 'knowledge',
  })
  async getPosts(@Query('type') type?: string) {
    return this.postService.getPosts(type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('likes')
  @ApiOperation({ summary: 'Get IDs of posts liked by the user' })
  async getLikedPostIds(@Request() req) {
    const userId = req.user.userId as string;
    const result = await this.postService.getLikedPostIds(userId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  async addPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    const result = await this.postService.addPost(
      req.user.userId,
      createPostDto,
    );
    return {
      message: USER_MESSAGES.ADD_POST_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update a post' })
  async updatePost(@Request() req, @Body() updatePostDto: UpdatePostDto) {
    const result = await this.postService.updatePost(
      req.user.userId,
      updatePostDto,
    );
    return {
      message: USER_MESSAGES.UPDATE_POST_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({
    name: 'postId',
    type: 'string',
    required: true,
    description: 'Post ID',
    example: '66fe1855ed43466415cef4d3',
  })
  async deletePost(@Request() req, @Param('postId') postId: string) {
    const userId = req.user.userId as string;
    await this.postService.deletePost(userId, postId);
    return {
      message: USER_MESSAGES.DELETE_POST_SUCCESSFULLY,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId/comments')
  @ApiOperation({ summary: 'Get comments of a post' })
  @ApiParam({
    name: 'postId',
    type: 'string',
    required: true,
    description: 'Post ID',
    example: '66fe1855ed43466415cef4d3',
  })
  async getCommentsOfPost(@Param('postId') postId: string) {
    const result = await this.commentService.getCommentsByPostId(postId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('comments')
  @ApiOperation({ summary: 'Add a comment to a post' })
  async addComment(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    const userId = req.user.userId as string;
    const result = await this.postService.addComment(userId, createCommentDto);
    return {
      message: USER_MESSAGES.ADD_COMMMENT_SUCCESSFULLY,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('likes')
  @ApiOperation({ summary: 'Add a like to a post' })
  async addLike(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    const userId = req.user.userId as string;
    const result = await this.postService.addLike(userId, createLikeDto);
    if (result) {
      return {
        message: USER_MESSAGES.LIKE_POST_SUCCESSFULLY,
        result,
      };
    }
    return {
      message: USER_MESSAGES.UNLIKE_POST_SUCCESSFULLY,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('comments/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({
    name: 'commentId',
    type: 'string',
    required: true,
    description: 'Comment ID',
    example: '66fe1855ed43466415cef4d3',
  })
  async deleteComment(@Request() req, @Param('commentId') commentId: string) {
    const userId = req.user.userId as string;
    await this.postService.deleteComment(userId, commentId);
    return {
      message: USER_MESSAGES.DELETE_COMMMENT_SUCCESSFULLY,
    };
  }
}
