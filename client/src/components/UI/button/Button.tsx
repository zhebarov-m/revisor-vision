import styles from './Button.module.scss'
import {customClasses} from "../../../lib/customClasses/customClasses.ts";
import {ButtonHTMLAttributes, FC} from "react";

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    HOVERED = 'hovered'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props;


    return (
        <button
            type="button"
            className={customClasses(
                styles.Button,
                {},
                [className!, styles[theme!]],
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
};
