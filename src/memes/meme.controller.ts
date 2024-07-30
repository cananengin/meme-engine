import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MemeService } from './meme.service';
import { Meme } from './schemas/meme.schema';

@Controller('memes')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  @Get()
  async getAllMemes() {
    return this.memeService.findAll();
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<Meme[]> {
    return this.memeService.searchMemes(query);
  }

  @Get(':id')
  async getMeme(@Param('id') id: string) {
    return this.memeService.findOne(id);
  }

  @Post()
  async addMeme(@Body() createMemeDto: any) {
    return this.memeService.createMeme(createMemeDto);
  }

  @Put(':id')
  async updateMeme(@Param('id') id: string, @Body() updateMemeDto: any) {
    return this.memeService.updateMeme(id, updateMemeDto);
  }

  @Delete(':id')
  async deleteMeme(@Param('id') id: string) {
    return this.memeService.deleteMeme(id);
  }

  @Get('random')
  async getRandomMeme() {
    return this.memeService.findRandomMeme();
  }
}
