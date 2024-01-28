import styles from './Loader.module.scss';
import {customClasses} from "../../../lib/customClasses/customClasses.ts";

interface LoaderProps {
    className?: string
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={customClasses(styles.ldsRoller, {}, [className!])}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
    </div>
);
