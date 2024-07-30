import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemeDocument = Meme & Document;

@Schema()
export class Meme {
  @Prop({ type: String })
  id: string = '';

  @Prop({ type: String })
  name: string = '';

  @Prop({ type: Number })
  lines: number = 0;

  @Prop({ type: Number })
  overlays: number = 0;

  @Prop({ type: [Object] })
  styles: any[] = [];

  @Prop({ type: String })
  blank: string = '';

  @Prop({ type: Object })
  example: {
    text: string[];
    url: string;
  } = { text: [], url: '' };

  @Prop({ type: String })
  source: string = '';

  @Prop({ type: [String], default: [] })
  keywords: string[] = [];

  @Prop({ type: String })
  _self: string = '';

  @Prop({ type: String })
  aspectRatio: string = '';

  @Prop({ type: Number })
  width: number = 0;

  @Prop({ type: Number })
  height: number = 0;

  @Prop({ type: Number })
  box_count: number = 0;
}

export const MemeSchema = SchemaFactory.createForClass(Meme);