import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartsService } from './cart.service';

describe('CartController', () => {
  let controller: CartController;
  let service: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartsService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});