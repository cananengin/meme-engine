import { Test, TestingModule } from '@nestjs/testing';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';
import { CreateMemeDto } from './dto/create-meme.dto';
import { Meme } from './schemas/meme.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockMeme = {
  id: 'aag',
  name: 'Ancient Aliens Guy',
  lines: 2,
  overlays: 0,
  styles: [],
  blank: 'https://api.memegen.link/images/aag.png',
  example: {
    text: ['', 'aliens'],
    url: 'https://api.memegen.link/images/aag/_/aliens.png',
  },
  source: 'http://knowyourmeme.com/memes/ancient-aliens',
  keywords: ['History Channel'],
  _self: 'https://api.memegen.link/templates/aag',
  aspectRatio: 'horizontal',
  width: 800,
  height: 600,
  box_count: 0,
};

const mockCreateMemeDto: CreateMemeDto = {
  name: 'Ancient Aliens Guy',
  url: 'https://api.memegen.link/images/aag.png',
  width: 800,
  height: 600,
  aspectRatio: 'horizontal',
  source: 'http://knowyourmeme.com/memes/ancient-aliens',
  keywords: ['History Channel'],
};

const mockMemeService = {
  findAll: jest.fn().mockResolvedValue([mockMeme]),
  searchMemes: jest.fn().mockResolvedValue([mockMeme]),
  createMeme: jest.fn().mockResolvedValue(mockMeme),
  updateMeme: jest.fn().mockResolvedValue(mockMeme),
  deleteMeme: jest.fn().mockResolvedValue(mockMeme),
  findRandomMeme: jest.fn().mockResolvedValue(mockMeme),
};

describe('MemeController', () => {
  let controller: MemeController;
  let service: MemeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemeController],
      providers: [
        {
          provide: MemeService,
          useValue: mockMemeService,
        },
      ],
    }).compile();

    controller = module.get<MemeController>(MemeController);
    service = module.get<MemeService>(MemeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of memes', async () => {
      const result = await controller.getAllMemes();
      expect(result).toEqual([mockMeme]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('searchMemes', () => {
    it('should return an array of memes matching the query', async () => {
      const query = 'aliens';
      const result = await controller.search(query);
      expect(result).toEqual([mockMeme]);
      expect(service.searchMemes).toHaveBeenCalledWith(query);
    });
  });

  describe('createMeme', () => {
    it('should create and return a meme', async () => {
      const result = await controller.addMeme(mockCreateMemeDto);
      expect(result).toEqual(mockMeme);
      expect(service.createMeme).toHaveBeenCalledWith(mockCreateMemeDto);
    });
  });

  describe('updateMeme', () => {
    it('should update and return a meme', async () => {
      const id = 'aag';
      const updateMemeDto = mockCreateMemeDto;
      const result = await controller.updateMeme(id, updateMemeDto);
      expect(result).toEqual(mockMeme);
      expect(service.updateMeme).toHaveBeenCalledWith(id, updateMemeDto);
    });
  });

  describe('deleteMeme', () => {
    it('should delete and return a meme', async () => {
      const id = 'aag';
      const result = await controller.deleteMeme(id);
      expect(result).toEqual(mockMeme);
      expect(service.deleteMeme).toHaveBeenCalledWith(id);
    });
  });

  describe('findRandomMeme', () => {
    it('should return a random meme', async () => {
      const result = await controller.getRandomMeme();
      expect(result).toEqual(mockMeme);
      expect(service.findRandomMeme).toHaveBeenCalled();
    });
  });
});
