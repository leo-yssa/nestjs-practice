import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonController } from '@common/interface/controller/common.controller';
import { GetCountryQueryHandler } from '@common/application/handler/get-country.handler';
import { CountryRepository } from '@common/infrastructure/database/repository/country.repository';
import { CountryEntity } from '@common/infrastructure/database/entity/country.entity';
import { CountryService } from '@common/application/service/country.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([CountryEntity])],
  controllers: [CommonController],
  providers: [
    GetCountryQueryHandler,
    {
      provide: 'CountryRepository',
      useClass: CountryRepository,
    },
    {
      provide: 'CountryService',
      useClass: CountryService,
    },
  ],
})
export class CommonModule {}
