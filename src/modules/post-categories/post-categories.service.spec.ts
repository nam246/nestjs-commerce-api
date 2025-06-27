import { Test, TestingModule } from '@nestjs/testing';
import { PostsCategoryService } from './post-categories.service';

describe('PostsCategoryService', () => {
  let service: PostsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsCategoryService],
    }).compile();

    service = module.get<PostsCategoryService>(PostsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
