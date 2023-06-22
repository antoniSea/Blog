import { Request, Response } from 'express';

export class BaseController {
    constructor(public repository) {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const data = await this.repository.getAll();
        return res.json(data);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const data = await this.repository.getById(req.params.id);
        return res.json(data);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const data = await this.repository.create(req.body);

        return res.status(201).json(data);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const data = await this.repository.update(req.params.id, req.body);
        return res.json(data);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        await this.repository.delete(req.params.id);

        return res.status(204).send();
    }
}
