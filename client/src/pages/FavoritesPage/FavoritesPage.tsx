import styles from './Favorites.module.scss'
import {customClasses} from "../../lib/customClasses/customClasses.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import FavoritesIconActive from "../../assets/icons/favorites-icon-active.svg";
import {removeFromFavorites} from "../../redux/slices/FavoritesSlice.ts";
import {Photos} from "../CatalogPage/CatalogPage.tsx";
import EmptyFavorites from '../../assets/empty-favorites.png'


interface FavoritesPageProps {
    className?: string,
}

export const FavoritesPage = (props: FavoritesPageProps) => {
    const {className} = props
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.catalog.favorites)

    const handleClickRemove = (photoId: Photos) => {
        dispatch(removeFromFavorites(photoId))
    }

    return (
        <div className={customClasses(styles.FavoritesPage, {}, [className!])}>
            {
                favorites.length === 0
                    ? <div className={styles.empty}>
                        <img src={EmptyFavorites} alt=""/>
                        <div>
                            <h3>Список избранного пуст</h3>
                            <p>Добавляйте изображения, нажимая на звездочки</p>
                        </div>
                    </div>
                    : <div className={styles.favoritesGrid}>
                        {favorites.map((item, index) => {
                            return (
                                <div key={item.id + index} style={{position: 'relative'}}>
                                    <img src={item.url} alt=""/>
                                    <p>{item.title}</p>
                                    <img
                                        onClick={() => handleClickRemove(item)}
                                        className={styles.favorites}
                                        src={FavoritesIconActive}
                                        alt=""
                                    />
                                </div>
                            )
                        })}
                </div>
            }
        </div>
    );
};
