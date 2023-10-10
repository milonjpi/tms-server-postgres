import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Brand } from '@prisma/client';
import { BrandService } from './brand.service';

// create Brand
const createBrand = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await BrandService.createBrand(data);

  sendResponse<Brand>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand Created Successfully',
    data: result,
  });
});

// get all Brands
const getBrands = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandService.getBrands();

  sendResponse<Brand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands retrieved successfully',
    data: result,
  });
});

// get single Brand
const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BrandService.getSingleBrand(id);

  sendResponse<Brand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand retrieved successfully',
    data: result,
  });
});

// update single Brand
const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await BrandService.updateBrand(id, data);

  sendResponse<Brand>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Brand Updated Successfully',
    data: result,
  });
});

// delete Brand
const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BrandService.deleteBrand(id);

  sendResponse<Brand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand deleted successfully',
    data: result,
  });
});

export const BrandController = {
  createBrand,
  getBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};
