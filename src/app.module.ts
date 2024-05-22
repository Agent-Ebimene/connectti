import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
