import React from "react";
import { inject, observer } from "mobx-react";
import { types } from "mobx-state-tree";

import InfoModal from "../../components/Infomodal/Infomodal";
import { guidGenerator } from "../../core/Helpers";
import Registry from "../../core/Registry";
import { AnnotationMixin } from "../../mixins/AnnotationMixin";
import PerRegionMixin from "../../mixins/PerRegion";
import RequiredMixin from "../../mixins/Required";
import { isDefined } from "../../utils/utilities";
import ControlBase from "./Base";

/**
 * Number adds numeric classification
 *
 * @example
 * <View>
 *   <Text name="txt" value="$text" />
 *   <Number name="number" toName="txt" max="10" />
 * </View>
 *
 * @name Number
 * @param {string} name                       - Name of the element
 * @param {string} toName                     - Name of the element that you want to label
 * @param {number} [min]                      - Minimum number value
 * @param {number} [max]                      - Maximum number value
 * @param {number} [step=1]                   - Step for value increment/decrement
 * @param {number} [defaultValue]             - Default number value
 * @param {string} hotkey                     - HotKey for increasing number value
 * @param {boolean} [required=false]          - Whether number validation is required
 * @param {string} [requiredMessage]          - Message to show if validation fails
 * @param {boolean} [perRegion]               - Use this tag to label regions instead of the whole object
 */
const TagAttrs = types.model({
  name: types.identifier,
  toname: types.maybeNull(types.string),

  min: types.maybeNull(types.string),
  max: types.maybeNull(types.string),
  step: types.maybeNull(types.string),
  defaultvalue: types.maybeNull(types.string),

  hotkey: types.maybeNull(types.string),
});

const Model = types
  .model({
    pid: types.optional(types.string, guidGenerator),
    type: "number",
    number: types.maybeNull(types.number),
  })
  .views(self => ({
    selectedValues() {
      return self.number;
    },

    get holdsState() {
      return isDefined(self.number);
    },

    get result() {
      if (self.perregion) {
        const area = self.annotation.highlightedNode;

        if (!area) return null;

        return self.annotation.results.find(r => r.from_name === self && r.area === area);
      }
      return self.annotation.results.find(r => r.from_name === self);
    },
  }))
  .actions(self => ({
    getSelectedString() {
      return self.number + " star";
    },

    copyState(obj) {
      self.setNumber(obj.number);
    },

    needsUpdate() {
      if (self.result) self.number = self.result.mainValue;
      else self.number = null;
    },

    beforeSend() {
      // add defaultValue to results for top-level controls
      if (!isDefined(self.number) && isDefined(self.defaultvalue) && !self.perRegion) {
        self.setNumber(+self.defaultvalue);
      }
    },

    unselectAll() {},

    setNumber(value) {
      self.number = value;

      if (self.result) {
        self.result.area.setValue(self);
      } else {
        if (self.perregion) {
          const area = self.annotation.highlightedNode;

          if (!area) return null;
          area.setValue(self);
        } else {
          self.annotation.createResult({}, { number: value }, self, self.toname);
        }
      }
    },

    onChange(e) {
      const value = +e.target.value;

      if (!isNaN(value)) self.setNumber(value);
    },

    updateFromResult() {
      this.needsUpdate();
    },

    requiredModal() {
      InfoModal.warning(self.requiredmessage || `Number "${self.name}" is required.`);
    },

    increaseValue() {
      if (self.number >= Number(self.max)) {
        self.setNumber(0);
      } else {
        if (self.number > 0) {
          self.setNumber(self.number + 1);
        } else {
          self.setNumber(1);
        }
      }
    },

    onHotKey() {
      return self.increaseValue();
    },
  }));

const NumberModel = types.compose("NumberModel", ControlBase, TagAttrs, Model, RequiredMixin, PerRegionMixin, AnnotationMixin);

const HtxNumber = inject("store")(
  observer(({ item, store }) => {
    const visibleStyle = item.perRegionVisible() ? {} : { display: "none" };

    return (
      <div style={visibleStyle}>
        <input
          type="number"
          name={item.name}
          value={item.number ?? item.defaultvalue ?? 0}
          step={item.step ?? 1}
          min={isDefined(item.min) ? Number(item.min) : undefined}
          max={isDefined(item.max) ? Number(item.max) : undefined}
          defaultValue={Number(item.defaultvalue)}
          onChange={item.onChange}
        />
        {store.settings.enableTooltips && store.settings.enableHotkeys && item.hotkey && (
          <sup style={{ fontSize: "9px" }}>[{item.hotkey}]</sup>
        )}
      </div>
    );
  }),
);

Registry.addTag("number", NumberModel, HtxNumber);

export { HtxNumber, NumberModel };
