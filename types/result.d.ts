/**
 * Type definitions for Human result object
 */
import { Tensor } from '../dist/tfjs.esm.js';
/** Face results
 * Combined results of face detector, face mesh, age, gender, emotion, embedding, iris models
 * Some values may be null if specific model is not enabled
 *
 * Each result has:
 * - id: face id number
 * - confidence: overal detection confidence value
 * - boxConfidence: face box detection confidence value
 * - faceConfidence: face keypoints detection confidence value
 * - box: face bounding box as array of [x, y, width, height], normalized to image resolution
 * - boxRaw: face bounding box as array of [x, y, width, height], normalized to range 0..1
 * - mesh: face keypoints as array of [x, y, z] points of face mesh, normalized to image resolution
 * - meshRaw: face keypoints as array of [x, y, z] points of face mesh, normalized to range 0..1
 * - annotations: annotated face keypoints as array of annotated face mesh points
 * - age: age as value
 * - gender: gender as value
 * - genderConfidence: gender detection confidence as value
 * - emotion: emotions as array of possible emotions with their individual scores
 * - embedding: facial descriptor as array of numerical elements
 * - iris: iris distance from current viewpoint as distance value in centimeters for a typical camera
 *   field of view of 88 degrees. value should be adjusted manually as needed
 * - rotation: face rotiation that contains both angles and matrix used for 3d transformations
 *  - angle: face angle as object with values for roll, yaw and pitch angles
 *  - matrix: 3d transofrmation matrix as array of numeric values
 *  - gaze: gaze direction as object with values for bearing in radians and relative strength
 * - tensor: face tensor as Tensor object which contains detected face
 */
export interface Face {
    id: number;
    confidence: number;
    boxConfidence: number;
    faceConfidence: number;
    box: [number, number, number, number];
    boxRaw: [number, number, number, number];
    mesh: Array<[number, number, number]>;
    meshRaw: Array<[number, number, number]>;
    annotations: Array<{
        part: string;
        points: Array<[number, number, number]>[];
    }>;
    age: number;
    gender: string;
    genderConfidence: number;
    emotion: Array<{
        score: number;
        emotion: string;
    }>;
    embedding: Array<number>;
    iris: number;
    rotation: {
        angle: {
            roll: number;
            yaw: number;
            pitch: number;
        };
        matrix: [number, number, number, number, number, number, number, number, number];
        gaze: {
            bearing: number;
            strength: number;
        };
    };
    tensor: typeof Tensor;
}
/** Body results
 *
 * Each results has:
 * - id: body id number
 * - score: overall detection score
 * - box: bounding box: x, y, width, height normalized to input image resolution
 * - boxRaw: bounding box: x, y, width, height normalized to 0..1
 * - keypoints: array of keypoints
 *  - part: body part name
 *  - position: body part position with x,y,z coordinates
 *  - score: body part score value
 *  - presence: body part presence value
 */
export interface Body {
    id: number;
    score: number;
    box: [x: number, y: number, width: number, height: number];
    boxRaw: [x: number, y: number, width: number, height: number];
    keypoints: Array<{
        part: string;
        position: {
            x: number;
            y: number;
            z?: number;
        };
        positionRaw?: {
            x: number;
            y: number;
            z?: number;
        };
        score: number;
        presence?: number;
    }>;
}
/** Hand results
 *
 * Each result has:
 * - id: hand id number
 * - confidence: detection confidence score as value
 * - box: bounding box: x, y, width, height normalized to input image resolution
 * - boxRaw: bounding box: x, y, width, height normalized to 0..1
 * - landmarks: landmarks as array of [x, y, z] points of hand, normalized to image resolution
 * - annotations: annotated landmarks for each hand part
 */
export interface Hand {
    id: number;
    confidence: number;
    box: [number, number, number, number];
    boxRaw: [number, number, number, number];
    landmarks: Array<[number, number, number]>;
    annotations: Record<string, Array<[number, number, number]>>;
}
/** Object results
*
* Array of individual results with one object per detected gesture
* Each result has:
* - id: object id number
* - score as value
* - label as detected class name
* - box: bounding box: x, y, width, height normalized to input image resolution
* - boxRaw: bounding box: x, y, width, height normalized to 0..1
* - center: optional center point as array of [x, y], normalized to image resolution
* - centerRaw: optional center point as array of [x, y], normalized to range 0..1
*/
export interface Item {
    id: number;
    score: number;
    strideSize?: number;
    class: number;
    label: string;
    center?: number[];
    centerRaw?: number[];
    box: number[];
    boxRaw: number[];
}
/** Gesture results
 *
 * Array of individual results with one object per detected gesture
 * Each result has:
 * - part: part name and number where gesture was detected: face, iris, body, hand
 * - gesture: gesture detected
 */
export declare type Gesture = {
    'face': number;
    gesture: string;
} | {
    'iris': number;
    gesture: string;
} | {
    'body': number;
    gesture: string;
} | {
    'hand': number;
    gesture: string;
};
/** Person getter
*
* Each result has:
* - id: person id
* - face: face object
* - body: body object
* - hands: array of hand objects
* - gestures: array of gestures
* - box: bounding box: x, y, width, height normalized to input image resolution
* - boxRaw: bounding box: x, y, width, height normalized to 0..1
*/
export interface Person {
    id: number;
    face: Face;
    body: Body | null;
    hands: {
        left: Hand | null;
        right: Hand | null;
    };
    gestures: Array<Gesture>;
    box: [number, number, number, number];
    boxRaw?: [number, number, number, number];
}
/**
 * Result interface definition for **Human** library
 *
 * Contains all possible detection results
 */
export interface Result {
    /** {@link Face}: detection & analysis results */
    face: Array<Face>;
    /** {@link Body}: detection & analysis results */
    body: Array<Body>;
    /** {@link Hand}: detection & analysis results */
    hand: Array<Hand>;
    /** {@link Gesture}: detection & analysis results */
    gesture: Array<Gesture>;
    /** {@link Object}: detection & analysis results */
    object: Array<Item>;
    /** global performance object with timing values for each operation */
    performance: Record<string, unknown>;
    /** optional processed canvas that can be used to draw input on screen */
    readonly canvas?: OffscreenCanvas | HTMLCanvasElement;
    /** timestamp of detection representing the milliseconds elapsed since the UNIX epoch */
    readonly timestamp: number;
    /** getter property that returns unified persons object  */
    persons: Array<Person>;
}