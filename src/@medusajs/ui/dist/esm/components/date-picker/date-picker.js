"use client";
import { Time } from "@internationalized/date";
import { Calendar as CalendarIcon, Minus } from "@medusajs/icons";
import * as Primitives from "@radix-ui/react-popover";
import { format } from "date-fns";
import * as React from "react";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { TimeInput } from "../time-input";
import { clx } from "../../utils/clx";
import { isBrowserLocaleClockType24h } from "../../utils/is-browser-locale-hour-cycle-24h";
import { cva } from "class-variance-authority";
const displayVariants = cva(clx("text-ui-fg-base bg-ui-bg-field border-ui-border-base transition-fg shadow-buttons-neutral flex w-full items-center gap-x-2 rounded-md border outline-none", "hover:bg-ui-bg-field-hover", "focus:border-ui-border-interactive focus:shadow-borders-active data-[state=open]:shadow-borders-active data-[state=open]:border-ui-border-interactive", "disabled:bg-ui-bg-disabled disabled:text-ui-fg-disabled disabled:shadow-none", "aria-[invalid=true]:!border-ui-border-error aria-[invalid=true]:!shadow-borders-error"), {
    variants: {
        size: {
            base: "text-compact-small txt-compact-medium h-10 px-3 py-[9px]",
            small: "text-compact-medium txt-compact-small h-8 px-2 py-[5px]",
        },
    },
    defaultVariants: {
        size: "base",
    },
});
const Display = React.forwardRef(({ className, children, placeholder, size = "base", ...props }, ref) => {
    return (React.createElement(Primitives.Trigger, { asChild: true },
        React.createElement("button", { ref: ref, className: clx(displayVariants({ size }), className), ...props },
            React.createElement(CalendarIcon, { className: "text-ui-fg-muted h-5 w-5" }),
            React.createElement("span", { className: "w-full overflow-hidden text-ellipsis whitespace-nowrap text-left" }, children ? (children) : placeholder ? (React.createElement("span", { className: "text-ui-fg-muted" }, placeholder)) : null))));
});
Display.displayName = "DatePicker.Display";
const Flyout = React.forwardRef(({ className, children, ...props }, ref) => {
    return (React.createElement(Primitives.Content, { ref: ref, sideOffset: 8, align: "center", className: clx("txt-compact-small shadow-elevation-flyout bg-ui-bg-base z-30 rounded-lg", "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }, children));
});
Flyout.displayName = "DatePicker.Flyout";
const PresetContainer = ({ presets, onSelect, currentValue, }) => {
    const isDateRangePresets = (preset) => {
        return "dateRange" in preset;
    };
    const isDatePresets = (preset) => {
        return "date" in preset;
    };
    const handleClick = (preset) => {
        if (isDateRangePresets(preset)) {
            onSelect(preset.dateRange);
        }
        else if (isDatePresets(preset)) {
            onSelect(preset.date);
        }
    };
    const compareDates = (date1, date2) => {
        return (date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear());
    };
    const compareRanges = (range1, range2) => {
        const from1 = range1.from;
        const from2 = range2.from;
        let equalFrom = false;
        if (from1 && from2) {
            const sameFrom = compareDates(from1, from2);
            if (sameFrom) {
                equalFrom = true;
            }
        }
        const to1 = range1.to;
        const to2 = range2.to;
        let equalTo = false;
        if (to1 && to2) {
            const sameTo = compareDates(to1, to2);
            if (sameTo) {
                equalTo = true;
            }
        }
        return equalFrom && equalTo;
    };
    const matchesCurrent = (preset) => {
        if (isDateRangePresets(preset)) {
            const value = currentValue;
            return value && compareRanges(value, preset.dateRange);
        }
        else if (isDatePresets(preset)) {
            const value = currentValue;
            return value && compareDates(value, preset.date);
        }
        return false;
    };
    return (React.createElement("ul", { className: "flex flex-col items-start" }, presets.map((preset, index) => {
        return (React.createElement("li", { key: index, className: "w-full" },
            React.createElement("button", { className: clx("txt-compact-small-plus w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md p-2 text-left", "text-ui-fg-subtle hover:bg-ui-bg-base-hover outline-none transition-all", "focus:bg-ui-bg-base-hover", {
                    "!bg-ui-bg-base-pressed": matchesCurrent(preset),
                }), onClick: () => handleClick(preset), "aria-label": `Select ${preset.label}` }, preset.label)));
    })));
};
const formatDate = (date, includeTime) => {
    const usesAmPm = !isBrowserLocaleClockType24h();
    if (includeTime) {
        if (usesAmPm) {
            return format(date, "MMM d, yyyy h:mm a");
        }
        return format(date, "MMM d, yyyy HH:mm");
    }
    return format(date, "MMM d, yyyy");
};
const SingleDatePicker = ({ defaultValue, value, size = "base", onChange, presets, showTimePicker, disabled, className, ...props }) => {
    var _a;
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState((_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : undefined);
    const [month, setMonth] = React.useState(date);
    const time = React.useMemo(() => {
        var _a, _b;
        const hour = (_a = date === null || date === void 0 ? void 0 : date.getHours()) !== null && _a !== void 0 ? _a : 0;
        const minute = (_b = date === null || date === void 0 ? void 0 : date.getMinutes()) !== null && _b !== void 0 ? _b : 0;
        return new Time(hour, minute, 0);
    }, [date]);
    const initialDate = React.useMemo(() => {
        return date;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    React.useEffect(() => {
        if (date) {
            setMonth(date);
        }
    }, [date]);
    React.useEffect(() => {
        if (!open) {
            setMonth(date);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    const handleCancel = () => {
        setDate(initialDate);
        setOpen(false);
    };
    const handleDateChange = (date) => {
        setDate(date);
        onChange === null || onChange === void 0 ? void 0 : onChange(date);
    };
    const handleTimeChange = (time) => {
        if (date) {
            const newDate = new Date(date.getTime());
            newDate.setHours(time.hour);
            newDate.setMinutes(time.minute);
            newDate.setSeconds(time.second);
            setDate(newDate);
            onChange === null || onChange === void 0 ? void 0 : onChange(newDate);
        }
    };
    const formattedDate = React.useMemo(() => {
        if (!date) {
            return null;
        }
        return formatDate(date, showTimePicker);
    }, [date, showTimePicker]);
    return (React.createElement(Primitives.Root, { open: open, onOpenChange: setOpen },
        React.createElement(Display, { placeholder: "Pick a date", disabled: disabled, className: className, "aria-required": props.required || props["aria-required"], "aria-invalid": props["aria-invalid"], "aria-label": props["aria-label"], "aria-labelledby": props["aria-labelledby"], size: size }, formattedDate),
        React.createElement(Flyout, null,
            React.createElement("div", { className: "flex" },
                React.createElement("div", { className: "flex items-start" },
                    presets && presets.length > 0 && (React.createElement("div", { className: "relative h-full w-[160px] border-r" },
                        React.createElement("div", { className: "absolute inset-0 overflow-y-scroll p-3" },
                            React.createElement(PresetContainer, { currentValue: date, presets: presets, onSelect: handleDateChange })))),
                    React.createElement("div", null,
                        React.createElement(Calendar, { mode: "single", month: month, onMonthChange: setMonth, selected: date, onSelect: handleDateChange, disabled: disabled, ...props }),
                        showTimePicker && (React.createElement("div", { className: "border-ui-border-base border-t p-3" },
                            React.createElement(TimeInput, { "aria-label": "Time", onChange: handleTimeChange, isDisabled: !date, value: time, isRequired: props.required }))),
                        React.createElement("div", { className: "border-ui-border-base flex items-center gap-x-2 border-t p-3" },
                            React.createElement(Button, { variant: "secondary", className: "w-full", type: "button", onClick: handleCancel }, "Cancel"),
                            React.createElement(Button, { variant: "primary", className: "w-full", type: "button", onClick: () => setOpen(false) }, "Apply"))))))));
};
const RangeDatePicker = ({ defaultValue, value, onChange, size = "base", showTimePicker, presets, disabled, className, ...props }) => {
    var _a;
    const [open, setOpen] = React.useState(false);
    const [range, setRange] = React.useState((_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : undefined);
    const [month, setMonth] = React.useState(range === null || range === void 0 ? void 0 : range.from);
    const time = React.useMemo(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const startHour = (_b = (_a = range === null || range === void 0 ? void 0 : range.from) === null || _a === void 0 ? void 0 : _a.getHours()) !== null && _b !== void 0 ? _b : 0;
        const startMinute = (_d = (_c = range === null || range === void 0 ? void 0 : range.from) === null || _c === void 0 ? void 0 : _c.getMinutes()) !== null && _d !== void 0 ? _d : 0;
        const endHour = (_f = (_e = range === null || range === void 0 ? void 0 : range.to) === null || _e === void 0 ? void 0 : _e.getHours()) !== null && _f !== void 0 ? _f : 0;
        const endMinute = (_h = (_g = range === null || range === void 0 ? void 0 : range.to) === null || _g === void 0 ? void 0 : _g.getMinutes()) !== null && _h !== void 0 ? _h : 0;
        return {
            start: new Time(startHour, startMinute, 0),
            end: new Time(endHour, endMinute, 0),
        };
    }, [range]);
    const initialRange = React.useMemo(() => {
        return range;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    React.useEffect(() => {
        if (range) {
            setMonth(range.from);
        }
    }, [range]);
    React.useEffect(() => {
        if (!open) {
            setMonth(range === null || range === void 0 ? void 0 : range.from);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    const handleRangeChange = (range) => {
        setRange(range);
        onChange === null || onChange === void 0 ? void 0 : onChange(range);
    };
    const handleCancel = () => {
        setRange(initialRange);
        setOpen(false);
    };
    const handleTimeChange = (time, pos) => {
        if (!range) {
            return;
        }
        if (pos === "start") {
            if (!range.from) {
                return;
            }
            const newDate = new Date(range.from.getTime());
            newDate.setHours(time.hour);
            newDate.setMinutes(time.minute);
            setRange({
                ...range,
                from: newDate,
            });
        }
        if (pos === "end") {
            if (!range.to) {
                return;
            }
            const newDate = new Date(range.to.getTime());
            newDate.setHours(time.hour);
            newDate.setMinutes(time.minute);
            setRange({
                ...range,
                to: newDate,
            });
        }
    };
    const displayRange = React.useMemo(() => {
        if (!range) {
            return null;
        }
        return `${range.from ? formatDate(range.from, showTimePicker) : ""} - ${range.to ? formatDate(range.to, showTimePicker) : ""}`;
    }, [range, showTimePicker]);
    return (React.createElement(Primitives.Root, { open: open, onOpenChange: setOpen },
        React.createElement(Display, { placeholder: "Pick a date", disabled: disabled, className: className, "aria-required": props.required || props["aria-required"], "aria-invalid": props["aria-invalid"], "aria-label": props["aria-label"], "aria-labelledby": props["aria-labelledby"], size: size }, displayRange),
        React.createElement(Flyout, null,
            React.createElement("div", { className: "flex" },
                React.createElement("div", { className: "flex items-start" },
                    presets && presets.length > 0 && (React.createElement("div", { className: "relative h-full w-[160px] border-r" },
                        React.createElement("div", { className: "absolute inset-0 overflow-y-scroll p-3" },
                            React.createElement(PresetContainer, { currentValue: range, presets: presets, onSelect: handleRangeChange })))),
                    React.createElement("div", null,
                        React.createElement(Calendar, { mode: "range", selected: range, onSelect: handleRangeChange, month: month, onMonthChange: setMonth, numberOfMonths: 2, disabled: disabled, classNames: {
                                months: "flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-ui-border-base",
                            }, ...props }),
                        showTimePicker && (React.createElement("div", { className: "border-ui-border-base flex items-center justify-evenly gap-x-3 border-t p-3" },
                            React.createElement("div", { className: "flex flex-1 items-center gap-x-2" },
                                React.createElement("span", { className: "text-ui-fg-subtle" }, "Start:"),
                                React.createElement(TimeInput, { value: time.start, onChange: (v) => handleTimeChange(v, "start"), "aria-label": "Start date time", isDisabled: !(range === null || range === void 0 ? void 0 : range.from), isRequired: props.required })),
                            React.createElement(Minus, { className: "text-ui-fg-muted" }),
                            React.createElement("div", { className: "flex flex-1 items-center gap-x-2" },
                                React.createElement("span", { className: "text-ui-fg-subtle" }, "End:"),
                                React.createElement(TimeInput, { value: time.end, onChange: (v) => handleTimeChange(v, "end"), "aria-label": "End date time", isDisabled: !(range === null || range === void 0 ? void 0 : range.to), isRequired: props.required })))),
                        React.createElement("div", { className: "flex items-center justify-between border-t p-3" },
                            React.createElement("p", { className: clx("text-ui-fg-subtle txt-compact-small-plus") },
                                React.createElement("span", { className: "text-ui-fg-muted" }, "Range:"),
                                " ",
                                displayRange),
                            React.createElement("div", { className: "flex items-center gap-x-2" },
                                React.createElement(Button, { variant: "secondary", type: "button", onClick: handleCancel }, "Cancel"),
                                React.createElement(Button, { variant: "primary", type: "button", onClick: () => setOpen(false) }, "Apply")))))))));
};
const validatePresets = (presets, rules) => {
    const { toYear, fromYear, fromMonth, toMonth, fromDay, toDay } = rules;
    if (presets && presets.length > 0) {
        const fromYearToUse = fromYear;
        const toYearToUse = toYear;
        presets.forEach((preset) => {
            var _a, _b, _c, _d, _e, _f;
            if ("date" in preset) {
                const presetYear = preset.date.getFullYear();
                if (fromYear && presetYear < fromYear) {
                    throw new Error(`Preset ${preset.label} is before fromYear ${fromYearToUse}.`);
                }
                if (toYear && presetYear > toYear) {
                    throw new Error(`Preset ${preset.label} is after toYear ${toYearToUse}.`);
                }
                if (fromMonth) {
                    const presetMonth = preset.date.getMonth();
                    if (presetMonth < fromMonth.getMonth()) {
                        throw new Error(`Preset ${preset.label} is before fromMonth ${fromMonth}.`);
                    }
                }
                if (toMonth) {
                    const presetMonth = preset.date.getMonth();
                    if (presetMonth > toMonth.getMonth()) {
                        throw new Error(`Preset ${preset.label} is after toMonth ${toMonth}.`);
                    }
                }
                if (fromDay) {
                    const presetDay = preset.date.getDate();
                    if (presetDay < fromDay.getDate()) {
                        throw new Error(`Preset ${preset.label} is before fromDay ${fromDay}.`);
                    }
                }
                if (toDay) {
                    const presetDay = preset.date.getDate();
                    if (presetDay > toDay.getDate()) {
                        throw new Error(`Preset ${preset.label} is after toDay ${format(toDay, "MMM dd, yyyy")}.`);
                    }
                }
            }
            if ("dateRange" in preset) {
                const presetFromYear = (_a = preset.dateRange.from) === null || _a === void 0 ? void 0 : _a.getFullYear();
                const presetToYear = (_b = preset.dateRange.to) === null || _b === void 0 ? void 0 : _b.getFullYear();
                if (presetFromYear && fromYear && presetFromYear < fromYear) {
                    throw new Error(`Preset ${preset.label}'s 'from' is before fromYear ${fromYearToUse}.`);
                }
                if (presetToYear && toYear && presetToYear > toYear) {
                    throw new Error(`Preset ${preset.label}'s 'to' is after toYear ${toYearToUse}.`);
                }
                if (fromMonth) {
                    const presetMonth = (_c = preset.dateRange.from) === null || _c === void 0 ? void 0 : _c.getMonth();
                    if (presetMonth && presetMonth < fromMonth.getMonth()) {
                        throw new Error(`Preset ${preset.label}'s 'from' is before fromMonth ${format(fromMonth, "MMM, yyyy")}.`);
                    }
                }
                if (toMonth) {
                    const presetMonth = (_d = preset.dateRange.to) === null || _d === void 0 ? void 0 : _d.getMonth();
                    if (presetMonth && presetMonth > toMonth.getMonth()) {
                        throw new Error(`Preset ${preset.label}'s 'to' is after toMonth ${format(toMonth, "MMM, yyyy")}.`);
                    }
                }
                if (fromDay) {
                    const presetDay = (_e = preset.dateRange.from) === null || _e === void 0 ? void 0 : _e.getDate();
                    if (presetDay && presetDay < fromDay.getDate()) {
                        throw new Error(`Preset ${preset.dateRange.from}'s 'from' is before fromDay ${format(fromDay, "MMM dd, yyyy")}.`);
                    }
                }
                if (toDay) {
                    const presetDay = (_f = preset.dateRange.to) === null || _f === void 0 ? void 0 : _f.getDate();
                    if (presetDay && presetDay > toDay.getDate()) {
                        throw new Error(`Preset ${preset.label}'s 'to' is after toDay ${format(toDay, "MMM dd, yyyy")}.`);
                    }
                }
            }
        });
    }
};
const DatePicker = ({ mode = "single", ...props }) => {
    if (props.presets) {
        validatePresets(props.presets, props);
    }
    if (mode === "single") {
        return React.createElement(SingleDatePicker, { ...props });
    }
    return React.createElement(RangeDatePicker, { ...props });
};
export { DatePicker };
//# sourceMappingURL=date-picker.js.map