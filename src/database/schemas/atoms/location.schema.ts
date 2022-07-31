import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
class GeoPoint {
  @Prop({ default: 'Point' })
  type?: string;

  @Prop({ require: true, index: '2dsphere' })
  coordinates: number[];
}

@Schema()
export class Location {
  @Prop({ type: GeoPoint })
  geometry: GeoPoint;
}
