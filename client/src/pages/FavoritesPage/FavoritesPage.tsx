import styles from './Favorites.module.scss'
import {customClasses} from "../../lib/customClasses/customClasses.ts";


interface FavoritesPageProps {
    className?: string,
    fav: string[]
}

export const FavoritesPage = (props: FavoritesPageProps ) => {
    const {className, fav} = props
    console.log(fav)

    return (
        <div className={customClasses(styles.FavoritesPage, {}, [className!])}>
            <h1>FAVORITES</h1>
            {fav.map((f, index) => <img key={index} src={f} alt=""/>)}
        </div>
    );
};
