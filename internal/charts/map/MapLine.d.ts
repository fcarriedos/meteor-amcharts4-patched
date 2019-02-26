/**
 * Map line module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapObject, IMapObjectProperties, IMapObjectAdapters, IMapObjectEvents } from "./MapObject";
import { MapLineObject } from "./MapLineObject";
import { MapLineSeriesDataItem, MapLineSeries } from "./MapLineSeries";
import { MapImage } from "./MapImage";
import { IOrientationPoint } from "../../core/defs/IPoint";
import { IGeoPoint } from "../../core/defs/IGeoPoint";
import { ListTemplate, IListEvents } from "../../core/utils/List";
import { Polyline } from "../../core/elements/Polyline";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[MapLine]].
 */
export interface IMapLineProperties extends IMapObjectProperties {
    /**
     * Lat/long coordinates of all line ends and intermediate elbows.
     */
    multiGeoLine?: IGeoPoint[][];
    /**
     * If `true` it line will be arched in the way to simulate shortest path
     * over curvature of Earth's surface, based on currently used on projection.
     */
    shortestDistance?: boolean;
    /**
     * Instead of setting longitudes/latitudes you can set an array of images which will be connected by the line
     */
    imagesToConnect?: MapImage[];
}
/**
 * Defines events for [[MapLine]].
 */
export interface IMapLineEvents extends IMapObjectEvents {
}
/**
 * Defines adapters for [[MapLine]].
 *
 * @see {@link Adapter}
 */
export interface IMapLineAdapters extends IMapObjectAdapters, IMapLineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a line on the map.
 *
 * @see {@link IMapLineEvents} for a list of available events
 * @see {@link IMapLineAdapters} for a list of available Adapters
 */
export declare class MapLine extends MapObject {
    /**
     * Defines available properties.
     */
    _properties: IMapLineProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IMapLineAdapters;
    /**
     * Defines available events.
     */
    _events: IMapLineEvents;
    /**
     * A line visual element.
     */
    line: Polyline;
    /**
     * [_lineObjects description]
     *
     * @todo Description
     */
    protected _lineObjects: ListTemplate<MapLineObject>;
    /**
     * [_arrow description]
     *
     * @todo Description
     */
    protected _arrow: MapLineObject;
    /**
     * [_distance description]
     *
     * @todo Description
     */
    protected _distance: number;
    /**
     * Related data item.
     */
    _dataItem: MapLineSeriesDataItem;
    /**
     * A map series this object belongs to.
     */
    series: MapLineSeries;
    /**
     * Instead of setting longitudes/latitudes you can set an array of images which will be connected by the line
     * @ignore
     */
    protected _imagesToConnect: MapImage[];
    /**
     * Constructor
     */
    constructor();
    /**
     * @ignore
     */
    protected createLine(): void;
    /**
     * Converts a position within the line (0-1) to a physical point
     * coordinates.
     *
     * 0 indicates start of the line, 0.5 - middle, while 1 indicates the end.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    positionToPoint(position: number): IOrientationPoint;
    /**
     * @return [description]
     */
    /**
     * [multiGeoLine description]
     *
     * @todo Description
     * @param multiGeoLine [description]
     */
    multiGeoLine: IGeoPoint[][];
    /**
     * @return {MapImages[]}
     */
    /**
     * Instead of setting longitudes/latitudes you can set an array of images
     * which will be connected by the line.
     *
     * Parameter is an array that can hold string `id`'s to of the images, or
     * references to actual [[MapImage]] objects.
     *
     * @param images  Images
     */
    imagesToConnect: MapImage[] | string[];
    /**
     * (Re)validates the line, effectively forcing it to redraw.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * @ignore Exclude from docs
     */
    measureElement(): void;
    /**
     * @return Real path?
     */
    /**
     * The line should take the shortest path over the globe.
     *
     * Enabling this will make the line look differently in different
     * projections. Only `MapLine` supports this setting, `MapArc` and
     * `MapSplice` don't.
     *
     * @default false
     * @param value  Real path?
     */
    shortestDistance: boolean;
    /**
     * List of separate line objects, the line consists of.
     *
     * @todo Description (review)
     * @readonly
     * @return List of line objects
     */
    readonly lineObjects: ListTemplate<MapLineObject>;
    /**
     * Decorate a [[LineObject]] when it is added to the line.
     *
     * @param event  Event
     */
    protected handleLineObjectAdded(event: IListEvents<MapLineObject>["inserted"]): void;
    /**
     * @return Arrow element
     */
    /**
     * A [[MapLineObject]] to use as an option arrowhead on the line.
     *
     * Just accessing this property will create a default arrowhead on the line
     * automatically.
     *
     * @param arrow  Arrow element
     */
    arrow: MapLineObject;
    /**
     * Copies line properties and other attributes, like arrow, from another
     * instance of [[MapLine]].
     *
     * @param source  Source map line
     */
    copyFrom(source: this): void;
    /**
     * Latitude of the line center.
     *
     * @readonly
     * @return Latitude
     */
    readonly latitude: number;
    /**
     * Longitude of the line center.
     *
     * @readonly
     * @return Latitude
     */
    readonly longitude: number;
    /**
     * X coordinate for the slice tooltip.
     *
     * @return X
     */
    protected getTooltipX(): number;
    /**
     * Y coordinate for the slice tooltip.
     *
     * @return Y
     */
    protected getTooltipY(): number;
}