import { Quarter } from "./quarter";
// interface for receiving quarter range data from api
export interface QuarterRange {
    id: number;
    start_range: Date;
    end_range: Date;
    quarter_id: number;
    quarter: Quarter;
}