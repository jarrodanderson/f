/**
 * BlazePose Module
 */
import { Body } from '../result';
export declare function load(config: any): Promise<any>;
export declare function predict(image: any, config: any): Promise<Body[]>;
