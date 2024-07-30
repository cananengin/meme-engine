// src/meme/create-meme.dto.ts

import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateMemeDto {
  @IsString()
  readonly name: string | undefined;

  @IsString()
  readonly url: string | undefined;

  @IsNumber()
  readonly width: number | undefined;

  @IsNumber()
  readonly height: number | undefined;

  @IsString()
  readonly aspectRatio: string | undefined;

  @IsString()
  readonly source: string | undefined;

  @IsArray()
  @IsOptional()
  readonly keywords?: string[];

  @IsOptional()
  readonly example?: {
    text: string[];
    url: string;
  };
}
