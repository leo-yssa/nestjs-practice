import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CountryEntity } from '../entity/country.entity';
import { GetCountriesInputVO } from '@common/domain/vo/input/get-countries.vo';
import { ICountryRepository } from '@common/domain/repository/country-repository.interface';
import { GetCountriesResultVO } from '@common/domain/vo/result/get-countries.vo';
import { CountryVO } from '@common/domain/vo/country.vo';

@Injectable()
export class CountryRepository implements ICountryRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
  ) {}
  async getCountry(getCountriesInputVO: GetCountriesInputVO): Promise<GetCountriesResultVO> {
    const { name, callingCode } = getCountriesInputVO;
    const queryBuilder = this.countryRepository.createQueryBuilder('country');
    if (name) {
      queryBuilder.andWhere('(country.countryNameEn LIKE :name OR country.countryNameKr LIKE :name)', {
        name: `%${name}%`,
      });
    }

    if (callingCode) {
      queryBuilder.andWhere('country.countryCallingCode = :callingCode', {
        callingCode: callingCode,
      });
    }

    // 전체 개수 조회
    const total = await queryBuilder.getCount();

    // 페이지네이션 적용
    const countries = await queryBuilder
      .skip(getCountriesInputVO.pagination.skip)
      .take(getCountriesInputVO.pagination.limit)
      .orderBy('country.countryNameEn', 'ASC')
      .getMany();

    return plainToInstance(GetCountriesResultVO, {
      countries: countries.map((country) => plainToInstance(CountryVO, country)),
      total,
      page: getCountriesInputVO.pagination.page,
      limit: getCountriesInputVO.pagination.limit,
      totalPages: Math.ceil(total / getCountriesInputVO.pagination.limit),
    });
  }
}
