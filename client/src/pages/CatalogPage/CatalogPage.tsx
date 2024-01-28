import styles from './Catalog.module.scss';
import { customClasses } from "../../lib/customClasses/customClasses.ts";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import ListOpen from '../../assets/icons/list_icon_open.svg';
import ListClose from '../../assets/icons/list_icon_close.svg';
import FavoritesIcon from '../../assets/icons/favorites-icon.svg';
import FavoritesIconActive from '../../assets/icons/favorites-icon-active.svg';
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites, setModalPhoto} from "../../redux/slices/FavoritesSlice.ts";
import {RootState} from "../../redux/store.ts";
import {Modal} from "../../components/UI/modal/Modal.tsx";
import {Loader} from "../../components/UI/Loader/Loader.tsx";

interface CatalogPageProps {
    className?: string;
}

interface Albums {
    albumId: string;
    userId: string;
    title: string;
}

interface Catalog {
    id: string;
    name: string;
    username: string;
    email: string;
}

export interface Photos {
    id: string;
    albumId: string;
    title: string;
    url: string;
}

export const CatalogPage = memo((props: CatalogPageProps) => {
    const { className } = props;
    const [catalog, setCatalog] = useState<Catalog[]>([]);
    const [albumsUser, setAlbumsUser] = useState<Albums[]>([]);
    const [photosAlbum, setPhotosAlbum] = useState<Photos[]>([]);
    const [openUsers, setOpenUsers] = useState<{ [key: string]: boolean }>({});
    const [openAlbums, setOpenAlbums] = useState<{ [key: string]: boolean }>({});
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.catalog.favorites)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setTimeout(async () => {
                    const { data } = await axios.get('http://localhost:3000/users/');
                    setCatalog(data);
                    setLoading(false);
                }, 1000)
            } catch (error) {
                console.error("Ошибка при получении пользователей:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleOpenModal = (photo: Photos) => {
        dispatch(setModalPhoto(photo))
    }

    const handleClickUser = async (id: string) => {
        setOpenUsers(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));

        try {
            const { data } = await axios.get(`http://localhost:3000/albums/${id}`);
            setAlbumsUser(data);
        } catch (error) {
            console.error("Ошибка при получении альбомов пользователя:", error);
        }
    }

    const handleClickAlbum = async (id: string) => {
        setOpenAlbums(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));

        try {
            const { data } = await axios.get(`http://localhost:3000/photos/${id}`);
            setPhotosAlbum(data);
        } catch (error) {
            console.error("Ошибка при получении фотографий альбома:", error);
        }
    }

    const handleToggleFavorite = (photo: Photos) => {
        if (favorites.includes(photo)) {
            dispatch(removeFromFavorites(photo));
        } else {
            dispatch(addToFavorites(photo));
        }
    };

    return (
        <div className={customClasses(styles.Catalog, {}, [className!])}>
            <Modal />
            {loading ? (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 200}}>
                    <Loader />
                </div>
            ) : (
                catalog.map(user => (
                <div key={user.id} className={styles.userList}>
                    <div style={{ display: 'flex', gap: 24 }}>
                        {openUsers[user.id] ? <img src={ListClose} alt="" /> : <img src={ListOpen} alt="" />}
                        <p onClick={() => handleClickUser(user.id)} className={styles.user}>{user.name}</p>
                    </div>
                    {openUsers[user.id] && albumsUser.map(album => (
                        <div key={album.albumId}>
                            <div style={{ display: 'flex', marginLeft: '56px' }}>
                                {<img src={openAlbums[album.albumId] ? ListClose : ListOpen} alt="" />}
                                <p onClick={() => handleClickAlbum(album.albumId)} className={styles.album}>{album.title}</p>
                            </div>
                            <div className={styles.gridPhoto}>
                                {openAlbums[album.albumId] && photosAlbum.map(photo => (
                                    <div key={photo.id} style={{ position: "relative" }}>
                                        <img
                                            className={styles.photo}
                                            src={photo.url}
                                            title={photo.title}
                                            alt=""
                                            onClick={() => handleOpenModal(photo)}
                                        />
                                        {favorites.some(favPhoto => favPhoto.id === photo.id) && (
                                            <img
                                                onClick={() => handleToggleFavorite(photo)}
                                                className={styles.favorites}
                                                src={FavoritesIconActive}
                                                alt=""
                                            />
                                        )}
                                        {!favorites.some(favPhoto => favPhoto.id === photo.id) && (
                                            <img
                                                onClick={() => handleToggleFavorite(photo)}
                                                className={styles.favorites}
                                                src={FavoritesIcon}
                                                alt=""
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )))}
        </div>
    );
});
