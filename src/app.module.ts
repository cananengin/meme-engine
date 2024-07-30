import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemeModule } from './memes/meme.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cananengin:129581185cnn!@cluster0.qrnhv.mongodb.net/'),
    MemeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
