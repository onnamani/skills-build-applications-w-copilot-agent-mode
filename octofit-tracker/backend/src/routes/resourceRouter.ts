import { Router, type NextFunction, type Request, type Response } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<T>(model: Model<T>, sort: Record<string, 1 | -1> = {}) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response, next: NextFunction) => {
    try {
      response.json(await model.find().sort(sort).exec());
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await model.findById(request.params.id).exec();
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
      response.status(201).json(await model.create(request.body));
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await model
        .findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        .exec();
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.json(record);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const record = await model.findByIdAndDelete(request.params.id).exec();
      if (!record) {
        response.status(404).json({ error: 'Record not found' });
        return;
      }
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  return router;
}