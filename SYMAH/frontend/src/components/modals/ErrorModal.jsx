import Modal from "./Modal.jsx";
import Button from "../ui/Button.jsx";
import { XIcon } from "../ui/Icon.jsx";

export default function ErrorModal({
  open,
  title = "Error",
  message,
  onClose,
}) {
  return (
    <Modal
      open={open}
      title={title}
      subtitle="Ocurrió un error"
      onClose={onClose}
    >
      <div style={{ padding: 8 }}>
        <p style={{ color: "#b91c1c" }}>{message || "Ha ocurrido un error."}</p>
        <div
          style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="primary" onClick={onClose} iconLeft={<XIcon />}>
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
