import classNames from "classnames";

export interface ODBInputProps {
    placeholder?: string,
    className?: string,
    name?: string,
    id?: string,
    size?: HTMLInputElement["size"],
    value?: HTMLInputElement["value"],
    onChange?: (value: any) => any,
}

export const ODBInput = ({placeholder, className, name, id, size, value, onChange}: ODBInputProps) =>
    <input className={classNames("border-t-none border-l-none border-r-none outline-none border-b-1 mx-1", className)} {...{placeholder, name, id, value, size}} onChange={onChange}/>
