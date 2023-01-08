import { Express, Request, Response} from "express";


function routes ( app: Express) {
    app.get("/apptest", (req: Request, res: Response) => res.send(200))
}


export default routes;