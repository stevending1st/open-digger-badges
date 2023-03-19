import classNames from "classnames";

export interface ODBOption {
    label: string;
    value: string;
}

export interface ODBSelectProps {
    placeholder?: string,
    className?: string,
    name?: HTMLSelectElement['name'],
    id?: HTMLSelectElement['id'],
    size?: HTMLSelectElement["size"],
    optionList?: ODBOption[],
    value?: HTMLSelectElement["value"],
    onChange?: (value: any) => any,
}

export const ODBSelect = ({ className, name, id, size, optionList, value, onChange }: ODBSelectProps) =>
    <select className={classNames("outline-none mx-1", className)} {...{ value, size, name, id }} onChange={onChange}>
        {optionList?.map(({label, value}) => <option key={value} value={value}>{label}</option>)}
    </select>
