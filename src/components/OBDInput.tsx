import classNames from "classnames";
import { forwardRef } from "react";

export interface ODBInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
}

export const ODBInput = forwardRef<HTMLInputElement, ODBInputProps>((props, ref) => {
    const { id, className, ...rest } = props;
    return (<input {...rest} className={classNames("border-t-none border-l-none border-r-none outline-none border-b-1 mx-1", className)} ref={ref} />)
})

ODBInput.displayName = 'ODBInput';
