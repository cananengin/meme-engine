import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Meme, MemeSchema } from './schemas/meme.schema';
import { MemeService } from './meme.service';
import { MemeController } from './meme.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meme.name, schema: MemeSchema }])
  ],
  providers: [MemeService],
  controllers: [MemeController],
})
export class MemeModule {}
