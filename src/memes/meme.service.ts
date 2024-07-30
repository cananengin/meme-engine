import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meme, MemeDocument } from './schemas/meme.schema';
import axios from 'axios';
import sizeOf from 'image-size';
import { CreateMemeDto } from './dto/create-meme.dto';

@Injectable()
export class MemeService implements OnModuleInit {
  private readonly logger = new Logger(MemeService.name);

  constructor(@InjectModel(Meme.name) private memeModel: Model<MemeDocument>) {}

  async onModuleInit() {
    await this.importMemes();
  }

  async getImageDimensions(url: string): Promise<{ width: number, height: number }> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const dimensions = sizeOf(response.data);
    if (dimensions.width && dimensions.height) {
      return { width: dimensions.width, height: dimensions.height };
    } else {
      throw new Error('Failed to get image dimensions.');
    }
  }

  async importMemes() {
    try {
      const response = await axios.get('https://api.memegen.link/templates');
      const memes = response.data;

      const memesWithDimensions = await Promise.all(memes.map(async (meme: any) => {
        const { width, height } = await this.getImageDimensions(meme.blank);
        return {
          name: meme.name,
          url: meme.blank,
          styles: meme.styles || [],
          width: width,
          height: height,
          box_count: meme.lines,
          aspectRatio: width / height > 1 ? 'horizontal' : 'vertical',
          source: meme.source,
          keywords: meme.keywords || [],
          example: meme.example,
          _self: meme._self,
        };
      }));

      await this.memeModel.insertMany(memesWithDimensions);
      this.logger.log('Memes successfully imported.');
    } catch (error: any) {
      this.logger.error('Failed to import memes', error.stack);
    }
  }


  async findAll() {
    return this.memeModel.find().exec();
  }

  async searchMemes(query: string): Promise<Meme[]> {
    try {
      const regex = new RegExp(query, 'i');
      return this.memeModel.find({
        $or: [
          { name: { $regex: regex } },
          { keywords: { $in: [query] } },
          { 'example.text': { $in: [query] } }
        ]
      }).exec();
    } catch (error: any) {
      this.logger.error('Failed to search memes', error.stack);
      throw error;
    }
  }

  async findOne(id: string) {
    return this.memeModel.findById(id).exec();
  }

  async createMeme(createMemeDto: CreateMemeDto): Promise<MemeDocument> {
    const meme = new this.memeModel(createMemeDto);
    return meme.save();
  }


  async updateMeme(id: string, updateMemeDto: any) {
    return this.memeModel.findByIdAndUpdate(id, updateMemeDto, { new: true }).exec();
  }

  async deleteMeme(id: string) {
    return this.memeModel.findByIdAndDelete(id).exec();
  }

  async findRandomMeme() {
    const memes = await this.memeModel.find().exec();
    const randomIndex = Math.floor(Math.random() * memes.length);
    return memes[randomIndex];
  }
}
