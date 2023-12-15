type PolicyReportFieldType = 'text' | 'date' | 'dropdown' | 'formula';

type PolicyReportField = {
    /** Name of the field */
    name: string;

    /** Default value assigned to the field */
    defaultValue: string;

    /** Unique id of the field */
    fieldID: string;

    /** Position at which the field should show up relative to the other fields */
    orderWeight: number;

    /** Type of report field */
    type: PolicyReportFieldType;

    /** Tells if the field is required or not */
    required: boolean;

    /** Options to select from if field is of type dropdown */
    options: string[];
};

type PolicyReportFields = Record<string, PolicyReportField>;
export default PolicyReportField;
export type {PolicyReportFields};
