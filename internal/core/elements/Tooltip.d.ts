/**
 * Provides functionality used to creating and showing tooltips (balloons).
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
import { PointedRectangle } from "./PointedRectangle";
import { IPoint } from "../defs/IPoint";
import { Label } from "../elements/Label";
import { Animation } from "../utils/Animation";
import { IRectangle } from "../defs/IRectangle";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Represents options for tooltip pointer (arrow) orientation.
 */
export declare type PointerOrientation = "horizontal" | "vertical";
/**
 * Defines properties for [[Tooltip]].
 */
export interface ITooltipProperties extends IContainerProperties {
    /**
     * Pointer orientation: "horizontal" or "vertical".
     *
     * @default "vertical"
     */
    pointerOrientation?: PointerOrientation;
    /**
     * Duration (ms) that takes for a Tooltip to move from one place to another.
     *
     * If set to a zero value, the Tooltop will jump to a new location
     * instantenously.
     *
     * If set to a non-zero value, the Tooltip will "glide" to a new location at
     * a speed determined by this setting.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    animationDuration?: number;
    /**
     * An easing function to use when animating Tooltip position.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/animations/} for more info about animations
     */
    animationEasing?: (value: number) => number;
    /**
     * Specifies if tooltip background should get stroke color from the sprite
     * it is pointing to.
     */
    getStrokeFromObject?: boolean;
    /**
     * Specifies if tooltip background should get fill color from the sprite it
     * is pointing to.
     */
    getFillFromObject?: boolean;
    /**
     * Specifies if text color should be chosen automatically for a better
     * readability.
     */
    autoTextColor?: boolean;
}
/**
 * Defines events for [[Tooltip]].
 */
export interface ITooltipEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Tooltip]].
 *
 * @see {@link Adapter}
 */
export interface ITooltipAdapters extends IContainerAdapters, ITooltipProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Tooltip displays text and/or multimedia information in a balloon over chart
 * area.
 * @see {@link ITooltipEvents} for a list of available events
 * @see {@link ITooltipAdapters} for a list of available Adapters
 */
export declare class Tooltip extends Container {
    /**
     * Defines available properties.
     */
    _properties: ITooltipProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ITooltipAdapters;
    /**
     * Defines available events.
     */
    _events: ITooltipEvents;
    /**
     * A type for the background element.
     */
    _background: PointedRectangle;
    /**
     * Text element that represents tooltip contents.
     */
    label: Label;
    /**
     * A container that should be considered a "boundary" for the tooltip. A
     * bounding container is used to calculate numeric boundaries
     * (`boundingRect`). It is used to constrain the Tooltip to specific area on
     * the chart, like for example cursor tooltip in plot area.
     */
    protected _boundingContainer: Container;
    /**
     * Holds numeric boundary values. Calculated from the `boundingContainer`.
     */
    protected _boundingRect: IRectangle;
    /**
     * Coordinates tooltip's pointer (stem) should point to.
     */
    protected _pointTo: IPoint;
    /**
     * If set to `true` the pointer/stem of the Tooltip will not go outside
     * Tooltip's width or height depending on pointer's orientation.
     *
     * @default false
     */
    fitPointerToBounds: boolean;
    /**
     * If tooltipOrientation is vertical, it can be drawn below or above point. We need to know this when solving overlapping
     */
    protected _verticalOrientation: "up" | "down";
    /**
     * Position animation of a tooltip
     */
    protected _animation: $type.Optional<Animation>;
    /**
     * Constructor
     */
    constructor();
    protected handleVisibility(): void;
    /**
     * Specifies if tooltip background should get stroke color from the sprite it is pointing to.
     *
     * @return {boolean}
     * @default false
     */
    /**
     * Specifies if tooltip background should get stroke color from the sprite it is pointing to.
     *
     * @param value boolean
     */
    getStrokeFromObject: boolean;
    /**
     * @return {boolean}
     * @default true
     */
    /**
     * Specifies if text color should be chosen automatically for a better
     * readability.
     *
     * IMPORTANT: this feature is generally ignored, if `getFillFromObject = false`.
     *
     * If inheriting of `fill` color from object tooltip is displayed for is
     * disabled, this feature will not work. If you are explicitly setting a
     * color for tooltip background, you may set a color for its label as well
     * using `tooltip.label.fill` property.
     *
     *
     * @param value boolean
     */
    autoTextColor: boolean;
    /**
     * Specifies if tooltip background should get fill color from the sprite it is pointing to.
     *
     * @return {boolean}
     * @default true
     */
    /**
     * @param value boolean
     */
    getFillFromObject: boolean;
    /**
     * Creates and returns a background element.
     *
     * @ignore Exclude from docs
     * @return Background
     */
    createBackground(): this["_background"];
    /**
     * @return Orientation
     */
    /**
     * Pointer orientation: "horizontal" or "vertical".
     *
     * @default "vertical"
     * @param value  Orientation
     */
    pointerOrientation: PointerOrientation;
    /**
     * @return Orientation
     */
    /**
     * Duration in milliseconds for the animation to take place when the tooltip
     * is moving from one place to another.
     *
     * @default 0
     * @param value  number
     */
    animationDuration: number;
    /**
     * @return {Function}
     */
    /**
     * Tooltip animation (moving from one place to another) easing function.
     *
     * @default $ease.cubicOut
     * @param value (value: number) => number
     */
    animationEasing: (value: number) => number;
    /**
     * @return HTML content
     */
    /**
     * HTML content for the Tooltip.
     *
     * Provided value will be used as is, without applying any further
     * formatting to it.
     *
     * @param value  HTML content
     */
    html: string;
    /**
     * @return SVG text
     */
    /**
     * SVG text content for the Tooltip.
     *
     * Text can have a number of formatting options supported by
     * [[TextFormatter]].
     *
     * @param value  SVG text
     */
    text: string;
    /**
     * Creates the Tooltip.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Overrides functionality from the superclass.
     *
     * @ignore Exclude from docs
     */
    updateBackground(): void;
    /**
     * Draws Tooltip background (chrome, background and pointer/stem).
     *
     * @ignore Exclude from docs
     */
    drawBackground(): void;
    /**
     * Set nes tooltip's anchor point and moves whole tooltip.
     *
     * @param x  X coordinate
     * @param y  Y coordinate
     */
    pointTo(point: IPoint, instantly?: boolean): void;
    /**
     * Sets numeric boundaries Tooltip needs to obey (so it does not go outside
     * specific area).
     *
     * @ignore Exclude from docs
     * @param rectangle Boundary rectangle
     */
    setBounds(rectangle: IRectangle): void;
    /**
     * Sets a [[Container]] instance to be used when calculating numeric
     * boundaries for the Tooltip.
     *
     * @ignore Exclude from docs
     * @param container  Boundary container
     */
    boundingContainer: Container;
    /**
     * Updates numeric boundaries for the Tooltip, based on the
     * `boundingCountrainer`.
     */
    protected updateBounds(): void;
    /**
     * If tooltipOrientation is vertical, it can be drawn below or above point.
     * We need to know this when solving overlapping.
     *
     * @ignore Exclude from docs
     * @return "up" | "down"
     */
    readonly verticalOrientation: "up" | "down";
    /**
     * To avoid stackoverflow
     * @ignore
     */
    readonly tooltip: Tooltip;
    /**
     * Copies properties and other attributes.
     *
     * @param source  Source
     */
    copyFrom(source: this): void;
}