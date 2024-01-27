import styles from './Catalog.module.scss'
import {customClasses} from "../../lib/customClasses/customClasses.ts";


interface CatalogProps {
    className?: string
}

export const Catalog = (props: CatalogProps ) => {
    const {className} = props


    return (
        <div className={customClasses(styles.Catalog, {}, [className!])}>

        </div>
    );
};
