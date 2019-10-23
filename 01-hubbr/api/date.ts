import { NowRequest, NowResponse } from "@now/node";

export default function (req: NowRequest, res: NowResponse): void {
    res.json({ data: { date: (new Date()).getTime() } });
}