import styles from './Modal.module.scss'
import {customClasses} from "../../../lib/customClasses/customClasses.ts";
import {RootState} from "../../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import CloseModal from '../../../assets/icons/Close_modal.svg'
import {setModalPhoto} from "../../../redux/slices/FavoritesSlice.ts";


interface ModalProps {
    className?: string
}

export const Modal = (props: ModalProps ) => {
    const {className} = props
    const modalPhoto = useSelector((state: RootState) => state.catalog.photo);
    const dispath = useDispatch()
    console.log(modalPhoto.url)
    const handleClickCloseModal = () => {
        dispath(setModalPhoto({
            id: '',
            albumId: '',
            title: '',
            url: ''
        }))
    }

    const Mods: Record<string, string | boolean> = {[styles.opened]: modalPhoto.url}

    return (
        <div className={customClasses(styles.Modal, Mods, [className!])}>
            <div className={styles.overlay}>
                <div style={{background: 'white', padding: 10, borderRadius: 10}}>
                    <img
                        width={600}
                        src={modalPhoto.url}
                        alt={modalPhoto.title}/>
                </div>
                <img
                    onClick={handleClickCloseModal}
                    className={styles.closeModal}
                    src={CloseModal}
                    alt=""/>
            </div>
        </div>
    );
};
