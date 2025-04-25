import { ApiProperty } from '@nestjs/swagger';

export class BioAuthRequestDto {
  @ApiProperty({ description: '디바이스 고유 식별자' })
  uniqueId: string;
  @ApiProperty({
    description: '서명',
    example:
      'XwuFH+TYEBMSzqH8jzQNPvEaiPlHB673+aaUoIwrO7SMEIs8wkDmED2H/Fg+72zf2Ghv2nFSBxANEQNddmxUdpZgPXzXFU90yc01IS/FOYl7AW3DB2EeLuqQi0oDxo17EowRpLP5eEfah1QXg8sJBU5bNQSSNnk0751XSlRoq676Ipx6R+0bvJNm65o7E81wJQTVXYZFeoxDurATw+yyevm3TrtNIYv3VARrg2QyZbIHi+u0nkqcBpWgNU7c9Bph9Dq11Wmn0OFMr95uZAvrDrBCQrASflPkxL67meaQO9vWwf7Q2XCaREW7e1e4J5h2UZaBtluzRgHE6Q9tySbO/A==',
  })
  signature: string;
  @ApiProperty({ description: '메시지' })
  message: string;
}
