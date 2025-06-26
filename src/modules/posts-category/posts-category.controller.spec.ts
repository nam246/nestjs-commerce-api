import { Test, TestingModule } from '@nestjs/testing';
import { PostsCategoryController } from './posts-category.controller';

describe('PostsCategoryController', () => {
  let controller: PostsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsCategoryController],
    }).compile();

    controller = module.get<PostsCategoryController>(PostsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
