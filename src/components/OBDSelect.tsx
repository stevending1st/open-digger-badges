import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";

export interface ODBOption {
    label: string;
    value: string;
}

export interface ODBSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    id?: string;
    optionList?: ODBOption[];
}

export const ODBSelect = forwardRef<HTMLSelectElement, ODBSelectProps>((props: ODBSelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { id, className, optionList, ...rest } = props;
    return <select {...rest} className={classNames("outline-none mx-1", className)} id={id}>
        {optionList?.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
    </select>
})

ODBSelect.displayName = "ODBSelect";
