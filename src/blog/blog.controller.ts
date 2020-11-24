import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {

    constructor( private blogService: BlogService){};

    @Get('posts')
    async getPosts(@Res() res){
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID){
        const post = await this.blogService.getPost(postID);
        if (!post) throw new NotFoundException('post does not exsit!')
        return res.status(HttpStatus.OK).json(post);
    }

    @Get('post/:postID')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO){
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "post has been submitted successfuly!",
            post: newPost
        })
    }

    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO
    ){
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) throw new NotFoundException('post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: "post has been successfully updated!",
            post: editedPost
        })
 
    }

    @Delete('/delete')
    async delitePost(@Res() res, @Param('postID', new ValidateObjectId()) postID){
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) throw new NotFoundException('post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: "post has been successfully deleted!",
            post: deletedPost
        })
 
    }





}
