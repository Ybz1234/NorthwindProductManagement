import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import "./ModalContainer.css";

interface Props {
    size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
}

export default observer(function ModalContainer({ size = "mini" }: Props) {
    const { modalStore } = useStore();

    if (!modalStore.modal.open) return null;

    return (
        <div className="modal-overlay" onClick={modalStore.closeModal}>
            <div
                className={`modal-content ${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                {modalStore.modal.body}
            </div>
        </div>
    );
});