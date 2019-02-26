/**
 * Responsive functionality module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObjectEvents, IBaseObjectEvents } from "../Base";
import { Sprite, ISpriteProperties, ISpriteAdapters } from "../Sprite";
import { SpriteState } from "../SpriteState";
import { Container } from "../Container";
import { Component } from "../Component";
import { List } from "../utils/List";
import { Adapter } from "../utils/Adapter";
import { Optional } from "../utils/Type";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines an interface for the responsive rule, i.e. what overrides need to
 * be applied when certain conditions are matched.
 *
 * @important
 */
export interface IResponsiveRule {
    /**
     * A function which determines if this rule is relevant to current
     * conditions.
     *
     * Whenever the chrt size changes, this function will be run to determine
     * whether this rule needs to be applied.
     */
    relevant(target: Container): boolean;
    /**
     * A function which creates and returns a [[SpriteState]] that needs to be
     * set whenever rule should be applied.
     *
     * This is run only once.
     *
     * Once state is created, it is added to the Sprite's available states and
     * applied as necessary.
     */
    state(target: Sprite, stateId: string): Optional<SpriteState<ISpriteProperties, ISpriteAdapters>>;
    /**
     * ID of the rule.
     */
    id?: string;
}
/**
 * Defines events for [[Responsive]].
 */
export interface IResponsiveEvents extends IBaseObjectEvents {
    /**
     * Invoked when a list of applicable rules for the current resolution
     * changes.
     */
    ruleschanged: {};
    /**
     * Invoked after each rule is applied to the actual element.
     */
    ruleapplied: {
        /**
         * A rule that was just applied.
         */
        "rule": IResponsiveRule;
    };
}
/**
 * Defines adapters for [[Responsive]] class.
 *
 * Includes both the [[Adapter]] definitions and properties.
 *
 * @see {@link Adapter}
 */
export interface IResponsiveAdapters {
    /**
     * Are responsive features enabled?
     */
    enabled: boolean;
    /**
     * Use default rules?
     *
     * If this is set `false`, only user-defined rules will be applied.
     */
    useDefault: boolean;
    /**
     * A list of user-defined rules.
     */
    rules: List<IResponsiveRule>;
    /**
     * A list of default rules.
     */
    defaultRules: List<IResponsiveRule>;
    /**
     * A list of **all** rules - user-defined and default combined.
     */
    allRules: List<IResponsiveRule>;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Responsive is responsible for overriding certain properties when conditions
 * are met.
 *
 * This class is used to dynamically apply and change certain chart properties
 * based on the current values of properties.
 *
 * Mainly, this is used with [[Sprite]]'s dimensional properties, like
 * `pixelWidth` and `pixelHeight`. However, it can be used to dynamically
 * change any property, based on any other property's value.
 *
 * A default responsive rules are disabled.
 *
 * To enable, set `enabled = false`. E.g.:
 *
 * ```TypeScript
 * chart.responsive.enabled = true;
 * ```
 * ```JavaScript
 * chart.responsive.enabled = true;
 * ```
 *
 * @see {@link IResponsiveEvents} for a list of available events
 * @see {@link IResponsiveAdapters} for a list of available Adapters
 * @todo Add default rules
 * @todo Watch for rule modification
 * @important
 */
export declare class Responsive extends BaseObjectEvents {
    /**
     * Holds a list of responsive rules organized by object type.
     */
    protected _rules: List<IResponsiveRule>;
    /**
     * Holds the list of the default responsive rules.
     */
    protected _defaultRules: List<IResponsiveRule>;
    /**
     * Holds the list of currently applied rules.
     */
    protected _appliedRules: {
        [index: string]: boolean;
    };
    /**
     * Use default rules in addition to the user-defined ones?
     */
    protected _useDefault: boolean;
    /**
     * A target object responsive rules apply to.
     */
    protected _component: $type.Optional<Component>;
    /**
     * Defines available events.
     */
    _events: IResponsiveEvents;
    /**
     * Defines available adapters.
     */
    _adapter: IResponsiveAdapters;
    /**
     * Adapter.
     */
    adapter: Adapter<this, IResponsiveAdapters>;
    /**
     * Indicates of responsive rules application is enabled.
     */
    protected _enabled: boolean;
    /**
     * Holds a disposer for size events.
     */
    private _sizeEventDisposer;
    /**
     * Collection of objects and state ids that do not have any properties set.
     */
    private _noStates;
    /**
     * Constructor
     */
    constructor();
    /**
     * @return Target object
     */
    /**
     * A target object that responsive rules will need to be applied to.
     *
     * @param value  Target object
     */
    component: $type.Optional<Component>;
    /**
     * @return Apply responsive rules?
     */
    /**
     * Should responsive rules be checked against and applied?
     *
     * @default false
     * @param value  Apply responsive rules?
     */
    enabled: boolean;
    /**
     * @return Use default rules?
     */
    /**
     * Should default responsive rules be applied in addition to user-defined
     * ones.
     *
     * User-defined rules will take precedence over default rules whenever they
     * produce conflicting settings.
     *
     * @default true
     * @param value  Use default rules?
     */
    useDefault: boolean;
    /**
     * @return User-defined rules
     */
    /**
     * User-defined responsive rules.
     *
     * User-defined rules will take precedence over default rules whenever they
     * produce conflicting settings.
     *
     * Use `allRules` to get all applicable rules including default and
     * user-defined ones.
     *
     * @param value  User-defined rules
     */
    rules: List<IResponsiveRule>;
    /**
     * Default responsive rules.
     *
     * @readonly
     * @return List of responsive rules
     */
    readonly defaultRules: List<IResponsiveRule>;
    /**
     * Returns all rules: default rules (if not disabled) combined with
     * user-defined ones.
     *
     * @readonly
     * @return List of all applicable rules
     */
    readonly allRules: List<IResponsiveRule>;
    /**
     * Checks if rule by the particular id currently applied.
     *
     * @param ruleId  Rule ID
     * @return Is currently applied?
     */
    protected isApplied(ruleId: string): boolean;
    /**
     * Checks which responsive rules currently satisfy their conditions and
     * should be applied, or unapplied.
     *
     * @ignore Exclude from docs
     */
    checkRules(): void;
    /**
     * Applies current rules to the object.
     *
     * @ignore Exclude from docs
     * @param target Target object
     * @todo Better type check
     */
    applyRules(target?: Container): void;
    /**
     * Applies specific oresponsive overrides to the element.
     *
     * @ignore Exclude from docs
     * @param rule    Responsive rule
     * @param target  Target element
     * @deprecated
     * @hidden
     */
    /**
     * Returns a relative state for the rule/target, or `undefined` if no state is
     * needed.
     *
     * @param rule    [description]
     * @param target  [description]
     * @return [description]
     */
    protected getState(rule: IResponsiveRule, target: any): Optional<SpriteState<any, any>>;
    /**
     * Gets a value from an element.
     *
     * @ignore Exclude from docs
     * @param target    Target object
     * @param property  Property
     * @return Property value
     */
    getValue(target: any, property: string): any;
    /**
     * Loads default responsive rules.
     *
     * @ignore Exclude from docs
     * @return Responsive rules
     */
    loadDefaultRules(): Promise<any>;
}
